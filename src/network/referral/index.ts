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
    const request = await fetch(getApiRoute("/api/referral/create"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        publicKey,
        signature,
        message: getProofMessage(),
      }),
    });

    const response = (await request.json()) as Response;

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
    const request = await fetch(getApiRoute("/api/referral/redeem"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        publicKey,
        signature,
        referralCode,
        message: getProofMessage(),
      }),
    });

    const response = (await request.json()) as RedeemResponse;

    if (response.success) {
      return response.user;
    }

    return null;
  } catch (e) {
    return null;
  }
};
