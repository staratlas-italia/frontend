import { NormalizedScoreVarsShipInfo } from "~/types";
import { ScoreFleetResponse } from "~/types/api";

export const getShipRates = async (mint: string) => {
  const ratesRes = await fetch(`/api/score/rates/${mint}`);

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

export const getPlayerStakeShips = async (pbk: string) => {
  const ratesRes = await fetch(`/api/score/${pbk}`);

  const ratesInfo: ScoreFleetResponse = await ratesRes.json();

  return ratesInfo;
};
