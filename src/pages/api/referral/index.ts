import { MongoClient, ServerApiVersion } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { isPostMiddleware } from "~/middlewares/isPost";

export type User = {
  createdAt?: Date;
  discordId: null;
  faction?: string;
  lastRefillAt?: Date;
  notifications: boolean;
  players: any[];
  tier?: 0 | 1 | 2;
  wallets: string[];
  referrals?: string[];
  fromReferral?: string;
};

const uri = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PWD}@sai-main.eh3jch5.mongodb.net/?retryWrites=true&w=majority`;

export const mongoClient = new MongoClient(uri, {
  serverApi: ServerApiVersion.v1,
});

const handler = async ({ body }: NextApiRequest, res: NextApiResponse) => {
  const { referralCode, publicKey } = body;

  if (!referralCode || !publicKey) {
    res.status(404).json({
      error: "Invalid referral code or public key",
    });
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

  const userWhoSendsReferral = await userCollection.findOne({
    referrals: { $in: [referralCode] },
  });

  if (!userWhoSendsReferral) {
    res.status(200).json({
      success: false,
      error: "Invalid referral code.",
    });
    return;
  }

  // Getting the user with `publicKey` or creating a new one
  const userWhoIsRedeemingReferral = (
    await userCollection.findOneAndUpdate(
      { wallets: { $in: [publicKey] } },
      {
        $setOnInsert: {
          wallets: [publicKey],
          discordId: null,
          notifications: false,
          players: [],
        },
      },
      { upsert: true, returnDocument: "before" }
    )
  ).value;

  if (!userWhoIsRedeemingReferral) {
    res.status(200).json({
      success: false,
      error: `Error fetching or creating user: ${publicKey}`,
    });
    return;
  }

  if (userWhoIsRedeemingReferral.fromReferral) {
    res.status(200).json({
      success: false,
      error: `Referral already redeemed`,
    });
    return;
  }

  if (userWhoSendsReferral._id.equals(userWhoIsRedeemingReferral._id)) {
    res.status(200).json({
      success: false,
      error: "You cannot referral yourself",
    });
    return;
  }

  await userCollection.updateOne(
    {
      _id: userWhoIsRedeemingReferral._id,
      fromReferral: { $exists: false },
    },
    { $set: { fromReferral: referralCode } }
  );

  res.status(200).json({
    success: true,
    user: {
      ...userWhoIsRedeemingReferral,
      fromReferral: referralCode,
    },
  });

  // let userWhoIsRedeemingReferralId = userWhoIsRedeemingReferral?._id;

  // if (!userWhoIsRedeemingReferralId) {
  //   const { insertedId } = await userCollection.insertOne({
  //     wallets: [publicKey],
  //     discordId: null,
  //     notifications: false,
  //     players: [],
  //     referrals: [referralCode],
  //   });

  //   userWhoIsRedeemingReferralId = insertedId;

  //   userWhoIsRedeemingReferral = await userCollection.findOne({
  //     wallets: { $in: [publicKey] },
  //   });
  // }

  // if (userWhoSendsReferral?._id.equals(userWhoIsRedeemingReferralId)) {
  //   res.status(200).json({
  //     success: false,
  //     error: "You cannot referral yourself",
  //   });
  // }

  // if (!userWithPublicKey) {
  //   const newUser = await userCollection.insertOne({
  //     wallets: [publicKey],
  //     discordId: null,
  //     notifications: false,
  //     players: [],
  //     referrals: [referralCode],
  //   });
  // } else {
  //   userWithPublicKey.referral;
  // }

  // let response = await fetch(
  //   `${process.env.STAR_ATLAS_API_URL}/players/${pubkey}`
  // );

  // let data = await response.json();

  // res.status(200).json(data);
};

export default isPostMiddleware(handler);
