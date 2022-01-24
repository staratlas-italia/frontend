import { ATLAS_DECIMAL } from "~/common/constants";

export const grossDailyRewardInAtlas = (
  rewardRatePerSecond: number,
  shipQuantityInEscrow: number
) => {
  return (
    (Math.round(
      (rewardRatePerSecond / ATLAS_DECIMAL) * 60 * 60 * 24 * ATLAS_DECIMAL
    ) /
      ATLAS_DECIMAL) *
    shipQuantityInEscrow
  );
};
