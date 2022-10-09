import { pipe } from "fp-ts/lib/function";
import { NextApiRequest, NextApiResponse } from "next";
import { matchMethodMiddleware } from "~/middlewares/matchMethod";
import { matchSignatureMiddleware } from "~/middlewares/matchSignature";
import { getMongoDatabase, mongoClient } from "~/pages/api/mongodb";
import { Self } from "~/types/api";

const handler = async ({ body }: NextApiRequest, res: NextApiResponse) => {
  const { referralCode, publicKey } = body;

  if (!referralCode || !publicKey) {
    res.status(400).json({
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

  const db = getMongoDatabase();

  const userCollection = db.collection<Self>("users");

  const userWhoSendsReferral = await userCollection.findOne({
    "referral.code": referralCode,
  });

  if (!userWhoSendsReferral) {
    res.status(400).json({
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
          // TODO
          players: [],
        },
      },
      { upsert: true, returnDocument: "before" }
    )
  ).value;

  if (!userWhoIsRedeemingReferral) {
    res.status(500).json({
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
};

export default pipe(
  handler,
  matchMethodMiddleware(["POST"]),
  matchSignatureMiddleware
);
