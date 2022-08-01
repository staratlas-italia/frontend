import { Cluster } from "@solana/web3.js";
import { ScoreFleetResponse } from "~/types/api";
import { appendQueryParams } from "~/utils/appendQueryParams";
import { fillUrlParameters } from "~/utils/fillUrlParameters";
import { getApiRoute } from "~/utils/getRoute";

export const fetchPlayerStakeShips = async (
  cluster: Cluster,
  publicKey: string
) => {
  const ratesRes = await fetch(
    appendQueryParams(
      fillUrlParameters(getApiRoute("/api/score/:publicKey"), {
        publicKey,
      }),
      { cluster }
    )
  );

  const ratesInfo: ScoreFleetResponse = await ratesRes.json();

  return ratesInfo;
};
