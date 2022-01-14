import { ONE_DAY_IN_MILLISECONDS } from "~/common/constants";

export const resDailyConsumption = (burnRate: number) => {
  return Math.round(ONE_DAY_IN_MILLISECONDS / burnRate);
};
