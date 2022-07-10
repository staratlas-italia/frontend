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
