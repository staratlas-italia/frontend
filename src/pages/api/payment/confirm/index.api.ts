import { captureException } from "@sentry/nextjs";
import {
  findReference,
  FindReferenceError,
  ValidateTransferError,
} from "@solana/pay";
import { Cluster, Connection, PublicKey } from "@solana/web3.js";
import BigNumber from "bignumber.js";
import { pipe } from "fp-ts/function";
import { NextApiRequest, NextApiResponse } from "next";
import { matchMethodMiddleware } from "~/middlewares/matchMethod";
import { useMongoMiddleware } from "~/middlewares/useMongo";
import { getMongoDatabase } from "~/pages/api/mongodb";
import { Transaction } from "~/types/api";
import { getConnectionClusterUrl } from "~/utils/connection";
import { isPublicKey } from "~/utils/pubkey";

const handler = async ({ body }: NextApiRequest, res: NextApiResponse) => {
  const {
    recipient,
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

    const status = await connection.getSignatureStatus(
      signatureInfo.signature,
      {
        searchTransactionHistory: true,
      }
    );

    if (status.value?.confirmationStatus !== "finalized") {
      throw new FindReferenceError("Not finalized yet");
    }

    if (status.value.err) {
      throw new ValidateTransferError("Transaction failed");
    }
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

    captureException(e, { level: "error" });

    console.log(JSON.stringify(e));

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
