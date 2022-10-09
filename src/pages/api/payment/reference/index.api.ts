import { Keypair } from "@solana/web3.js";
import { pipe } from "fp-ts/function";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getSftPrice } from "~/hooks/useSftPrice";
import { attachClusterMiddleware } from "~/middlewares/attachCluster";
import { matchMethodMiddleware } from "~/middlewares/matchMethod";
import { useMongoMiddleware } from "~/middlewares/useMongo";
import { getMongoDatabase } from "~/pages/api/mongodb";
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
    res.status(404).json({
      success: false,
      error: "User not found.",
    });
    return;
  }

  let pendingTransaction = await transactionsCollection.findOne({
    userId: new ObjectId(userId),
    status: "PENDING",
  });

  const acceptedWithoutReturnTransaction = await transactionsCollection.findOne(
    {
      userId: new ObjectId(userId),
      status: "ACCEPTED_WITHOUT_RETURN",
    }
  );

  if (acceptedWithoutReturnTransaction) {
    const timeago =
      Date.now() - acceptedWithoutReturnTransaction?.createdAt.getTime();

    // More than 5 minutes
    if (timeago >= 300_000) {
      pendingTransaction = acceptedWithoutReturnTransaction;
    }
  }

  if (pendingTransaction) {
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
  handler,
  matchMethodMiddleware(["POST"]),
  useMongoMiddleware,
  attachClusterMiddleware
);
