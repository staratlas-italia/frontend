import { ATLAS_DECIMAL, ONE_DAY_IN_MILLISECONDS } from "~/common/constants";

export const resDailyCostInAtlas = (
  resourcePrice: number,
  burnRate: number,
  shipQuantityInEscrow: number
) => {
  return (
    (Math.round(
      (ONE_DAY_IN_MILLISECONDS / burnRate) * resourcePrice * ATLAS_DECIMAL
    ) /
      ATLAS_DECIMAL) *
    shipQuantityInEscrow
  );
};
