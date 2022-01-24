import { ONE_DAY_IN_MILLISECONDS } from "~/common/constants";

export const resDailyConsumption = (
  burnRate: number,
  shipQuantityInEscrow: number
) => {
  return Math.round(ONE_DAY_IN_MILLISECONDS / burnRate) * shipQuantityInEscrow;
};
