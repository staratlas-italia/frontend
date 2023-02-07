import { captureException } from "@sentry/nextjs";
import { pipe } from "fp-ts/function";
import { isEqual } from "lodash";
import { NextApiRequest, NextApiResponse } from "next";
import { matchMethodMiddleware } from "~/middlewares/matchMethod";
import { useMongoMiddleware } from "~/middlewares/useMongo";
import { getMongoDatabase } from "~/pages/api/mongodb";
import { Self } from "~/types/api";
import { isPublicKey } from "~/utils/pubkey";

const rightOrder = [
  "100A97787B9FD5A42492099419E18A2E",
  "2804BD6A988449A4BBBAFD8D55484EF6",
  "BA0B39F79F3110FF3443813A30BB711A",
  "3CB91B5D56C203C9F13DB895E600D73C",
  "5A80AE5C43D03F9F942068A8AFB51AF7",
  "252ADC93CB268BE4E7CE16246648B45D",
  "FC4FC67DFEC7A53CA29C03DA63ECDDF3",
  "27A4153509B6E3EE73A7F2A9C5D19EE5",
  "E68DE297E241C0E3ED7E73F0977FCA39",
];

[
  "100A97787B9FD5A42492099419E18A2E",
  "2804BD6A988449A4BBBAFD8D55484EF6",
  "BA0B39F79F3110FF3443813A30BB711A",
  "3CB91B5D56C203C9F13DB895E600D73C",
  "5A80AE5C43D03F9F942068A8AFB51AF7",
  "252ADC93CB268BE4E7CE16246648B45D",
  "FC4FC67DFEC7A53CA29C03DA63ECDDF3",
  "27A4153509B6E3EE73A7F2A9C5D19EE5",
  "E68DE297E241C0E3ED7E73F0977FCA39",
];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const order = req.body.order as number[];
  const publicKey = req.body.publicKey as string;

  if (!isEqual(order, rightOrder)) {
    return res.status(200).json({
      success: false,
      error: "Wrong order",
    });
  }

  if (!order || !publicKey || !isPublicKey(publicKey)) {
    return res.status(400).json({
      success: false,
      error: "Invalid parameters supplied.",
    });
  }

  const db = getMongoDatabase();

  const usersCollection = db.collection<Self>("users");

  try {
    await usersCollection.updateOne(
      { wallets: publicKey },
      {
        $addToSet: {
          tags: "cat-lover",
        },
      }
    );

    return res.status(200).json({
      success: true,
    });
  } catch (e) {
    console.log(e);
    captureException(e, { level: "error" });

    return res.status(200).json({
      success: false,
    });
  }
};

export default pipe(
  handler,
  matchMethodMiddleware(["POST"]),
  useMongoMiddleware
);
