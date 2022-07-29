import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export const attachClusterMiddleware =
  (handler: NextApiHandler) => (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
      req.body = {
        cluster: "mainnet-beta",
        ...req.body,
      };
    }

    if (req.method === "GET") {
      req.query = {
        cluster: "mainnet-beta",
        ...req.query,
      };
    }

    return handler(req, res);
  };
