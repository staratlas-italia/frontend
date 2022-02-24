import bs58 from "bs58";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { sign } from "tweetnacl";
import { IS_ADMIN_SIGN_MSG } from "~/common/constants";
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
  (handler: NextApiHandler) => (req: NextApiRequest, res: NextApiResponse) => {
    const { publicKey } = req.body;

    const realPublicKey = tryParsePublicKey(publicKey);

    if (!publicKey || !realPublicKey) {
      return res
        .status(400)
        .json({ status: 400, error: "Missing or invalid parameters" });
    }

    const { signature } = req.body;

    if (!signature) {
      return res
        .status(400)
        .json({ status: 400, error: "Missing or invalid parameters" });
    }

    const signatureDecoded = bs58.decode(signature);

    const message = new TextEncoder().encode(IS_ADMIN_SIGN_MSG);

    try {
      if (
        !sign.detached.verify(
          message,
          signatureDecoded,
          realPublicKey.toBytes()
        )
      ) {
        return res
          .status(403)
          .json({ status: 403, error: "Signature does not match" });
      }
    } catch (err) {
      return res
        .status(403)
        .json({ status: 403, error: "Cannot verify signature" });
    }

    return handler(req, res);
  };
