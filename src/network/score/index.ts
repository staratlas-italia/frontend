import { NormalizedScoreVarsShipInfo } from "~/types";
import { ScoreFleetResponse } from "~/types/api";
import { fillUrlParameters } from "~/utils/fillUrlParameters";
import { getApiRoute } from "~/utils/getRoute";

export const getShipRates = async (mint: string) => {
  const ratesRes = await fetch(
    fillUrlParameters(getApiRoute("/api/score/rates/:mint"), { mint })
  );

  const ratesInfo: NormalizedScoreVarsShipInfo = await ratesRes.json();

  return ratesInfo;
};

export const getShipsRates = async (mints: string[]) => {
  let result: Record<string, NormalizedScoreVarsShipInfo> = {};
  let rates: NormalizedScoreVarsShipInfo;

  for (let mint of mints) {
    rates = await getShipRates(mint);
    result[mint] = rates;
  }

  return result;
};

export const getPlayerStakeShips = async (publicKey: string) => {
  const ratesRes = await fetch(
    fillUrlParameters(getApiRoute("/api/score/:publicKey"), { publicKey })
  );

  const ratesInfo: ScoreFleetResponse = await ratesRes.json();

  return ratesInfo;
};
