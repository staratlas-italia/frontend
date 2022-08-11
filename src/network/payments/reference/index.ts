import { PaymentReferenceResponse } from "~/types/api";
import { getApiRoute } from "~/utils/getRoute";

export const fetchPaymentReference = async (userId: string) => {
  try {
    const response = await fetch(getApiRoute("/api/payment/reference"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    const res = (await response.json()) as PaymentReferenceResponse;

    if (res.success) {
      return res.reference;
    }

    return null;
  } catch (e) {
    return null;
  }
};
