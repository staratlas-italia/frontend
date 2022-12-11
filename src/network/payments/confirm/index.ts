import { api } from "~/network/api";
import { ConfirmPaymentResponse } from "~/types/api";
import { getApiRoute } from "~/utils/getRoute";

type Param = {
  amount: number;
  publicKey: string;
  reference: string;
  signal?: AbortSignal;
};

export const confirmPayment = async ({
  amount,
  publicKey,
  reference,
  signal = new AbortController().signal,
}: Param) => {
  const response = await api.post<ConfirmPaymentResponse>(
    getApiRoute("/api/payment/confirm"),
    {
      body: {
        amount,
        publicKey,
        reference,
      },
      headers: {
        "Content-Type": "application/json",
      },
      signal,
    }
  );

  return response;
};
