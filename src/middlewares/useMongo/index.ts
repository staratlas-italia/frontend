import { captureException } from "@sentry/nextjs";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { mongoClient } from "~/pages/api/mongodb";

export const useMongoMiddleware =
  (handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await mongoClient.connect();
    } catch (e) {
      captureException(e, { level: "error" });

      res.status(500).json({
        error: "Cannot connect to DB.",
      });
      return;
    }

    return handler(req, res);
  };
