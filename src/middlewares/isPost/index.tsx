import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export type IsPostMiddlewareReponse = {
  status: 405;
  error: string;
};

export const isPostMiddleware =
  (handler: NextApiHandler) => (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
      return res.status(405).json({ status: 405, error: "Method not allowed" });
    }

    return handler(req, res);
  };
