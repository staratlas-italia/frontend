import { withSentry } from "@sentry/nextjs";
import { Keypair } from "@solana/web3.js";
import { pipe } from "fp-ts/function";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getSftPrice } from "~/hooks/useSftPrice";
import { attachClusterMiddleware } from "~/middlewares/attachCluster";
import { matchMethodMiddleware } from "~/middlewares/matchMethod";
import { useMongoMiddleware } from "~/middlewares/useMongo";
import { getMongoDatabase, mongoClient } from "~/pages/api/mongodb";
import { Self, Transaction } from "~/types/api";

const handler = async ({ body }: NextApiRequest, res: NextApiResponse) => {
  const { userId, cluster } = body;

  if (!userId) {
    res.status(400).json({
      success: false,
      error: "Invalid parameters supplied.",
    });
    return;
  }

  const db = getMongoDatabase(cluster);

  const transactionsCollection = db.collection<Transaction>("transactions");
  const usersCollection = db.collection<Self>("users");

  const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

  if (!user) {
    await mongoClient.close();

    res.status(404).json({
      success: false,
      error: "User not found.",
    });
    return;
  }

  const pendingTransaction = await transactionsCollection.findOne({
    userId: new ObjectId(userId),
    status: "PENDING",
  });

  if (pendingTransaction) {
    await mongoClient.close();

    res.status(200).json({
      success: true,
      reference: pendingTransaction.reference,
      returnReference: pendingTransaction.returnReference,
    });
    return;
  }

  const reference = Keypair.generate().publicKey.toString();
  const returnReference = Keypair.generate().publicKey.toString();

  const insertResult = await transactionsCollection.insertOne({
    meta: { amount: getSftPrice(), name: "CITIZENSHIP_CARD" },
    status: "PENDING",
    userId: new ObjectId(userId),
    reference,
    returnReference,
    createdAt: new Date(),
  });

  await mongoClient.close();

  if (insertResult.acknowledged) {
    res.status(200).json({
      success: true,
      reference,
      returnReference,
    });
  }

  res.status(200).json({
    success: false,
    error: "Insert failed",
  });
};

export default pipe(
  matchMethodMiddleware(handler, ["POST"]),
  useMongoMiddleware,
  attachClusterMiddleware,
  withSentry
);
