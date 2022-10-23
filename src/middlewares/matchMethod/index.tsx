import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export type MatchMethodMiddlewareReponse = {
  status: 405;
  error: string;
};

export const matchMethodMiddleware =
  (methods: ("GET" | "POST" | "PUT")[]) =>
  (handler: NextApiHandler) =>
  (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method && !(methods as string[]).includes(req.method)) {
      return res.status(405).json({ status: 405, error: "Method not allowed" });
    }

    return handler(req, res);
  };
