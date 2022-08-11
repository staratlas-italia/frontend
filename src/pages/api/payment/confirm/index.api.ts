import {
  findReference,
  FindReferenceError,
  validateTransfer,
  ValidateTransferError,
} from "@solana/pay";
import { Cluster, clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import BigNumber from "bignumber.js";
import { pipe } from "fp-ts/function";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import {
  DEVNET_USDC_TOKEN_MINT,
  SAI_CITIZEN_WALLET_DESTINATION,
  USDC_TOKEN_MINT,
} from "~/common/constants";
import { attachClusterMiddleware } from "~/middlewares/attachCluster";
import { matchMethodMiddleware } from "~/middlewares/matchMethod";
import { useMongoMiddleware } from "~/middlewares/useMongo";
import { mongoClient } from "~/pages/api/mongodb";
import { Transaction } from "~/types/api";

const sendTokens = async () => Promise.resolve(true);
//   const usersCollection = db.collection<Transaction>("users");
//   const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
//   if (!user) {
//     await mongoClient.close();
//     res.status(404).json({
//       success: false,
//       error: "User not found.",
//     });
//     return;
//   }
//   const pendingTransaction = await transactionsCollection.findOne({
//     userId: userId,
//     status: "PENDING",
//   });

const handler = async ({ body }: NextApiRequest, res: NextApiResponse) => {
  const {
    amount: amountParam,
    cluster: clusterParam,
    reference: referenceParam,
    userId,
  } = body;

  if (!amountParam || !userId || !referenceParam) {
    res.status(400).json({
      success: false,
      error: "Invalid parameters supplied.",
    });
    return;
  }

  const cluster = clusterParam as Cluster;

  const reference = new PublicKey(referenceParam);
  const amount = new BigNumber(Number(amountParam as string));
  const connection = new Connection(clusterApiUrl(cluster));

  const db = mongoClient.db("app-db");
  const transactionsCollection = db.collection<Transaction>("transactions");

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

  await transactionsCollection.findOneAndUpdate(
    {
      userId: new ObjectId(userId),
      status: "PENDING",
    },
    {
      $set: {
        status: "ACCEPTED_WITHOUT_RETURN",
      },
    }
  );

  const status = await sendTokens();

  if (!status) {
    res.status(200).json({
      success: false,
      error: "Not able to send tokens",
    });

    return;
  }

  await transactionsCollection.findOneAndUpdate(
    {
      userId: new ObjectId(userId),
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
  matchMethodMiddleware(handler, ["POST"]),
  attachClusterMiddleware,
  useMongoMiddleware
);
