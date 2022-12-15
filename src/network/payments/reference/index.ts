import { Cluster } from "@solana/web3.js";
import { api } from "~/network/api";
import { PaymentReferenceResponse } from "~/types/api";
import { getApiRoute } from "~/utils/getRoute";

type Param = {
  cluster?: Cluster;
  publicKey: string;
  swapAccount: string;
};

export const fetchPaymentReference = async ({
  swapAccount,
  publicKey,
}: Param) => {
  try {
    const response = await api.post<PaymentReferenceResponse>(
      getApiRoute("/api/payment/reference"),
      {
        headers: {
          "Content-Type": "application/json",
        },
        body: { swapAccount, publicKey },
      }
    );

    if (response.success) {
      return response;
    }

    return null;
  } catch (e) {
    return null;
  }
};
