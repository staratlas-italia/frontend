import { Cluster } from "@solana/web3.js";
import { Faction } from "~/types";
import { ConfirmPaymentResponse } from "~/types/api";
import { getApiRoute } from "~/utils/getRoute";

type Param = {
  cluster: Cluster;
  faction: Faction;
  publicKey: string;
  reference: string;
  signal?: AbortSignal;
};

export const confirmPayment = async ({
  cluster,
  faction,
  publicKey,
  reference,
  signal = new AbortController().signal,
}: Param) => {
  const response = await fetch(getApiRoute("/api/payment/confirm"), {
    method: "POST",
    signal,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cluster,
      faction,
      publicKey,
      reference,
    }),
  });

  return response.json() as Promise<ConfirmPaymentResponse>;
};
