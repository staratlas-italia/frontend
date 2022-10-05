import { Cluster } from "@solana/web3.js";
import { PaymentReferenceResponse } from "~/types/api";
import { getApiRoute } from "~/utils/getRoute";

type Param = {
  cluster?: Cluster;
  userId: string;
};

export const fetchPaymentReference = async ({ cluster, userId }: Param) => {
  try {
    const response = await fetch(getApiRoute("/api/payment/reference"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cluster, userId }),
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
