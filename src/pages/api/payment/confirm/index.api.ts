import { GrowthBook } from "@growthbook/growthbook-react";
import { withSentry } from "@sentry/nextjs";
import {
  findReference,
  FindReferenceError,
  validateTransfer,
  ValidateTransferError,
} from "@solana/pay";
import { Cluster, Connection, PublicKey } from "@solana/web3.js";
import BigNumber from "bignumber.js";
import { pipe } from "fp-ts/function";
import { NextApiRequest, NextApiResponse } from "next";
import {
  DEVNET_USDC_TOKEN_MINT,
  FEATURES_ENDPOINT,
  SAI_CITIZEN_WALLET_DESTINATION,
  USDC_TOKEN_MINT,
} from "~/common/constants";
import { getSftPrice } from "~/hooks/useSftPrice";
import { attachClusterMiddleware } from "~/middlewares/attachCluster";
import { matchMethodMiddleware } from "~/middlewares/matchMethod";
import { useMongoMiddleware } from "~/middlewares/useMongo";
import { getMongoDatabase } from "~/pages/api/mongodb";
import { Transaction } from "~/types/api";
import { getConnectionClusterUrl } from "~/utils/connection";
import { isPublicKey } from "~/utils/pubkey";

const growthbook = new GrowthBook();

const handler = async ({ body }: NextApiRequest, res: NextApiResponse) => {
  if (FEATURES_ENDPOINT) {
    const json = await fetch(FEATURES_ENDPOINT).then((res) => res.json());

    growthbook.setFeatures(json.features);
  }

  const amount = new BigNumber(getSftPrice(growthbook));

  const { cluster: clusterParam, reference: referenceParam, publicKey } = body;

  if (!referenceParam || !isPublicKey(publicKey)) {
    res.status(400).json({
      success: false,
      error: "Invalid parameters supplied.",
    });
    return;
  }

  const cluster = clusterParam as Cluster;

  const reference = new PublicKey(referenceParam);
  const connection = new Connection(getConnectionClusterUrl(cluster));

  try {
    const signatureInfo = await findReference(connection, reference, {
      finality: "confirmed",
    });

    await validateTransfer(
      connection,
      signatureInfo.signature,
      {
        recipient: SAI_CITIZEN_WALLET_DESTINATION,
        splToken:
          cluster === "devnet" ? DEVNET_USDC_TOKEN_MINT : USDC_TOKEN_MINT,
        amount,
        reference,
      },
      { commitment: "confirmed" }
    );
  } catch (e) {
    if (e instanceof FindReferenceError) {
      console.log("Not found yet", e);

      res.status(200).json({
        success: true,
        verified: false,
      });
      return;
    }

    if (e instanceof ValidateTransferError) {
      console.error("Transaction is invalid", e);

      res.status(200).json({
        success: false,
        error: "Invalid transaction",
      });
      return;
    }

    res.status(200).json({
      success: false,
      error: "Generic error",
    });

    return;
  }

  const db = getMongoDatabase(cluster);

  const transactionsCollection = db.collection<Transaction>("transactions");

  await transactionsCollection.findOneAndUpdate(
    {
      reference: referenceParam,
      status: "PENDING",
    },
    {
      $set: {
        status: "ACCEPTED_WITHOUT_RETURN",
      },
    }
  );

  res.status(200).json({
    success: true,
    verified: true,
  });
};

export default pipe(
  handler,
  withSentry,
  matchMethodMiddleware(["POST"]),
  attachClusterMiddleware,
  useMongoMiddleware,
  withSentry
);
