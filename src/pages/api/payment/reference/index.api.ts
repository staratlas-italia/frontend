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
  const { userId, cluster, faction, publicKey } = body;

  if (!userId || !faction || !publicKey) {
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
    "meta.faction": faction.toUpperCase(),
    status: "PENDING",
  });

  if (pendingTransaction) {
    res.status(200).json({
      success: true,
      reference: pendingTransaction.reference,
    });
    return;
  }

  const reference = Keypair.generate().publicKey.toString();

  const insertResult = await transactionsCollection.insertOne({
    meta: {
      faction: faction.toUpperCase(),
      publicKey,
      amount: getSftPrice(),
      name: "CITIZENSHIP_CARD",
    },
    status: "PENDING",
    userId: new ObjectId(userId),
    reference,
    createdAt: new Date(),
  });

  if (insertResult.acknowledged) {
    res.status(200).json({
      success: true,
      reference,
    });
    return;
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
