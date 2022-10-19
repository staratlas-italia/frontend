import { Cluster } from "@solana/web3.js";
import { Faction } from "~/types";
import { PaymentReferenceResponse } from "~/types/api";
import { getApiRoute } from "~/utils/getRoute";

type Param = {
  cluster?: Cluster;
  faction: Faction;
  publicKey: string;
  userId: string;
};

export const fetchPaymentReference = async ({
  cluster,
  faction,
  publicKey,
  userId,
}: Param) => {
  try {
    const response = await fetch(getApiRoute("/api/payment/reference"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cluster, faction, publicKey, userId }),
    });

    const res = (await response.json()) as PaymentReferenceResponse;

    if (res.success) {
      return res;
    }

    return null;
  } catch (e) {
    return null;
  }
};
