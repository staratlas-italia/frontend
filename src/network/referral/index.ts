import { captureException } from "@sentry/nextjs";
import { api } from "~/network/api";
import { Self } from "~/types/api";
import { getProofMessage } from "~/utils/getProofMessage";
import { getApiRoute } from "~/utils/getRoute";

type Response =
  | {
      success: true;
      code: string;
    }
  | {
      success: false;
      error: string;
    };

export const createReferral = async (
  publicKey: string,
  signature: string
): Promise<string | null> => {
  try {
    const response = await api.post<Response>(
      getApiRoute("/api/referral/create"),
      {
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          publicKey,
          signature,
          message: getProofMessage(),
        },
      }
    );

    if (response.success) {
      return response.code;
    }

    return null;
  } catch (e) {
    return null;
  }
};

type RedeemResponse =
  | {
      success: true;
      user: Self;
    }
  | {
      success: false;
      error: string;
    };

export const redeemReferral = async (
  publicKey: string,
  signature: string,
  referralCode: string
): Promise<Self | null> => {
  try {
    const response = await api.post<RedeemResponse>(
      getApiRoute("/api/referral/redeem"),
      {
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          publicKey,
          signature,
          referralCode,
          message: getProofMessage(),
        },
      }
    );

    if (response.success) {
      return response.user;
    }

    return null;
  } catch (e) {
    captureException(e, { level: "error" });

    return null;
  }
};
