import { ATLAS_DECIMAL } from './../../common/constants/index';
export const netDailyRewardInAtlas = (
  rewardInAtlas: number,
  maintenanceCostInAtlas: number
) => {
  return (
    Math.round((rewardInAtlas - maintenanceCostInAtlas) * ATLAS_DECIMAL) /
    ATLAS_DECIMAL
  );
};