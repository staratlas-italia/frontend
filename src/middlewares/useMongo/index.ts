import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { mongoClient } from "~/pages/api/mongodb";

export const useMongoMiddleware =
  (handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await mongoClient.connect();
    } catch (e) {
      console.log("Cannot connect to mongo...", JSON.stringify(e));
      res.status(500).json({
        error: "Cannot connect to DB.",
      });
      return;
    }

    return handler(req, res);
  };
