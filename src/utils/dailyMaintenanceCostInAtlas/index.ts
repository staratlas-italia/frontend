import { ATLAS_DECIMAL } from "~/common/constants";

export const dailyMaintenanceCostInAtlas = (
  fuelDailyCostInAtlas: number,
  foodDailyCostInAtlas: number,
  armsDailyCostInAtlas: number,
  toolkitDailyCostInAtlas: number
) => {
  return (
    Math.round(
      (fuelDailyCostInAtlas +
        foodDailyCostInAtlas +
        armsDailyCostInAtlas +
        toolkitDailyCostInAtlas) *
        ATLAS_DECIMAL
    ) / ATLAS_DECIMAL
  );
};
