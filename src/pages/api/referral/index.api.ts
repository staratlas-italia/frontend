import { NextApiRequest, NextApiResponse } from "next";
import { matchMethodMiddleware } from "~/middlewares/matchMethod";
import { mongoClient } from "~/pages/api/mongodb";
import { User } from "~/types/api";

const handler = async ({ query }: NextApiRequest, res: NextApiResponse) => {
  const { publicKey } = query;

  if (!publicKey) {
    res.status(400).json({
      error: "Invalid public key",
    });
    return;
  }

  try {
    await mongoClient.connect();
  } catch (e) {
    console.log("Cannot connect to mongo...", JSON.stringify(e));
    res.status(500).json({
      error: "Cannot connect to DB.",
    });
  }

  const db = mongoClient.db("app-db");

  const userCollection = db.collection<User>("users");

  const user = await userCollection.findOne({
    wallets: { $in: [publicKey] },
  });

  if (!user) {
    res.status(200).json({
      success: false,
      error: "User not found.",
    });
    return;
  }

  res.status(200).json({
    success: true,
    code: user.referral?.code || null,
  });
};

export default matchMethodMiddleware(handler, ["GET"]);
