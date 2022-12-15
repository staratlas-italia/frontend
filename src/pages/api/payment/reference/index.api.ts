import { Keypair } from "@solana/web3.js";
import { pipe } from "fp-ts/function";
import { NextApiRequest, NextApiResponse } from "next";
import { matchMethodMiddleware } from "~/middlewares/matchMethod";
import { useMongoMiddleware } from "~/middlewares/useMongo";
import { getMongoDatabase } from "~/pages/api/mongodb";
import { Self, Transaction } from "~/types/api";

const handler = async ({ body }: NextApiRequest, res: NextApiResponse) => {
  const { swapAccount, publicKey } = body;

  if (!swapAccount || !publicKey) {
    res.status(400).json({
      success: false,
      error: "Invalid parameters supplied.",
    });
    return;
  }

  const db = getMongoDatabase();

  const transactionsCollection = db.collection<Transaction>("transactions");
  const usersCollection = db.collection<Self>("users");

  const user = await usersCollection.findOne({ wallets: publicKey });

  if (!user) {
    res.status(404).json({
      success: false,
      error: "User not found.",
    });
    return;
  }

  let pendingTransaction = await transactionsCollection.findOne({
    publicKey,
    "meta.swapAccount": swapAccount,
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
      swapAccount,
      amount: 15,
      name: "CITIZENSHIP_CARD",
    },
    publicKey,
    status: "PENDING",
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
  useMongoMiddleware
);
