import { captureException } from "@sentry/nextjs";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { isSignatureValid } from "~/utils/isSignatureValid";
import { tryParsePublicKey } from "~/utils/pubkey";

export type MatchSignatureMiddlewareRequestBody = {
  publicKey: string;
  signature: string;
};

export type MatchSignatureMiddlewareReponse =
  | {
      status: 403;
      error: string;
    }
  | {
      status: 400;
      error: string;
    };

export const matchSignatureMiddleware =
  (handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { message, publicKey, signature } = req.body;

    const realPublicKey = tryParsePublicKey(publicKey);

    if (!publicKey || !realPublicKey || !message || !signature) {
      return res
        .status(400)
        .json({ status: 400, error: "Missing or invalid parameters" });
    }

    const isValid = isSignatureValid({
      message,
      signature,
      signer: publicKey,
    });

    try {
      if (!isValid) {
        res.status(403).json({
          status: 403,
          error: "Signature does not match",
        });
        return;
      }
    } catch (e) {
      captureException(e);

      res.status(403).json({ status: 403, error: "Cannot verify signature" });
      return;
    }

    return handler(req, res);
  };
