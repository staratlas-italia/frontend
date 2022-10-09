import { captureException } from "@sentry/nextjs";
import { Cluster, Connection, PublicKey } from "@solana/web3.js";
import { pipe } from "fp-ts/function";
import { NextApiRequest, NextApiResponse } from "next";
import {
  CITIZEN_TOKEN_MINT_PER_FACTION,
  DEVNET_CITIZEN_TOKEN_MINT_PER_FACTION,
} from "~/common/constants";
import { attachClusterMiddleware } from "~/middlewares/attachCluster";
import { matchMethodMiddleware } from "~/middlewares/matchMethod";
import { useMongoMiddleware } from "~/middlewares/useMongo";
import { getMongoDatabase } from "~/pages/api/mongodb";
import { Faction } from "~/types";
import { Transaction } from "~/types/api";
import { getConnectionClusterUrl } from "~/utils/connection";
import { isValidFaction } from "~/utils/isFaction";
import { isPublicKey } from "~/utils/pubkey";
import { startTransferTransaction } from "./startTransferTransaction";

const sendTokens = async ({
  connection,
  cluster,
  faction,
  recipient,
  reference,
}: {
  connection: Connection;
  cluster: Cluster;
  faction: Faction;
  recipient: string;
  reference: string;
}) => {
  const mint = (
    cluster === "devnet"
      ? DEVNET_CITIZEN_TOKEN_MINT_PER_FACTION
      : CITIZEN_TOKEN_MINT_PER_FACTION
  )[faction.toLowerCase()];

  try {
    await startTransferTransaction({
      connection,
      cluster,
      mint,
      recipient: new PublicKey(recipient),
      reference: new PublicKey(reference),
    });

    return true;
  } catch (e) {
    captureException(e, { level: "error" });

    return false;
  }
};

const handler = async ({ body }: NextApiRequest, res: NextApiResponse) => {
  const {
    cluster: clusterParam,
    faction,
    reference: referenceParam,
    returnReference: returnReferenceParam,
    publicKey,
  } = body;

  if (
    !referenceParam ||
    !returnReferenceParam ||
    !isValidFaction(faction) ||
    !isPublicKey(publicKey)
  ) {
    res.status(400).json({
      success: false,
      error: "Invalid parameters supplied.",
    });
    return;
  }

  const cluster = clusterParam as Cluster;

  const connection = new Connection(getConnectionClusterUrl(cluster));

  const db = getMongoDatabase(cluster);

  const transactionsCollection = db.collection<Transaction>("transactions");

  const result = await transactionsCollection.findOne({
    reference: referenceParam,
    status: "ACCEPTED_WITHOUT_RETURN",
  });

  if (!result) {
    res.status(200).json({
      success: true,
      eligible: false,
    });
    return;
  }

  const txid = await sendTokens({
    connection,
    cluster,
    faction,
    recipient: publicKey,
    reference: returnReferenceParam,
  });

  if (!txid) {
    res.status(200).json({
      success: false,
      error: "Not able to send tokens",
    });

    return;
  }

  await transactionsCollection.findOneAndUpdate(
    {
      reference: referenceParam,
      status: "ACCEPTED_WITHOUT_RETURN",
    },
    {
      $set: {
        status: "ACCEPTED",
      },
    }
  );

  res.status(200).json({
    success: true,
    eligible: true,
  });
};

export default pipe(
  handler,
  matchMethodMiddleware(["POST"]),
  attachClusterMiddleware,
  useMongoMiddleware
);
