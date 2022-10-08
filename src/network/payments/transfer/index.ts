import { Cluster } from "@solana/web3.js";
import { Faction } from "~/types";
import { TransferPaymentResponse } from "~/types/api";
import { getApiRoute } from "~/utils/getRoute";

type Param = {
  cluster: Cluster;
  faction: Faction;
  publicKey: string;
  reference: string;
  returnReference: string;
  signal?: AbortSignal;
};

export const transferPayment = async ({
  cluster,
  faction,
  publicKey,
  reference,
  returnReference,
  signal = new AbortController().signal,
}: Param) => {
  const response = await fetch(getApiRoute("/api/payment/transfer"), {
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
      returnReference,
    }),
  });

  return response.json() as Promise<TransferPaymentResponse>;
};
