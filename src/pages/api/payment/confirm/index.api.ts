import { captureException } from "@sentry/nextjs";
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
  SAI_CITIZEN_WALLET_DESTINATION,
  USDC_TOKEN_MINT,
} from "~/common/constants";
import { matchMethodMiddleware } from "~/middlewares/matchMethod";
import { useMongoMiddleware } from "~/middlewares/useMongo";
import { getMongoDatabase } from "~/pages/api/mongodb";
import { Transaction } from "~/types/api";
import { getConnectionClusterUrl } from "~/utils/connection";
import { isPublicKey } from "~/utils/pubkey";

const handler = async ({ body }: NextApiRequest, res: NextApiResponse) => {
  const {
    amount: amountParam,
    cluster: clusterParam,
    reference: referenceParam,
    publicKey,
  } = body;

  if (!amountParam || !referenceParam || !isPublicKey(publicKey)) {
    res.status(400).json({
      success: false,
      error: "Invalid parameters supplied.",
    });
    return;
  }

  const amount = new BigNumber(amountParam);

  const cluster = clusterParam as Cluster;

  const db = getMongoDatabase(cluster);

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
      res.status(200).json({
        success: true,
        verified: false,
      });
      return;
    }

    if (e instanceof ValidateTransferError) {
      captureException(e, { level: "error" });

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

  const transactionsCollection = db.collection<Transaction>("transactions");

  await transactionsCollection.findOneAndUpdate(
    {
      reference: referenceParam,
      status: "PENDING",
    },
    {
      $set: {
        status: "ACCEPTED",
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
  matchMethodMiddleware(["POST"]),
  useMongoMiddleware
);
