import { Connection, PublicKey } from "@solana/web3.js";
import { getAllFleetsForUserPublicKey } from "@staratlas/factory";
import type { NextApiRequest, NextApiResponse } from "next";
import { SA_FLEET_PROGRAM_ID } from "~/common/constants";
import { ScoreFleetResponse } from "~/types/api";
import { getConnectionContext } from "~/utils/connection";
import { isPublicKey } from "~/utils/pubkey";
import { getScoreVarsShipInfo } from "@staratlas/factory";

const connection = new Connection(
  getConnectionContext("mainnet-beta").endpoint
);

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ScoreFleetResponse>
) => {
  const {
    query: { pbk },
  } = req;

  if (!isPublicKey(pbk as string)) {
    res.status(200).json({
      success: false,
      error: "Invalid pubkey",
    });
    return;
  }

  const accounts = await getAllFleetsForUserPublicKey(
    connection,
    new PublicKey(pbk),
    new PublicKey(SA_FLEET_PROGRAM_ID)
  );

  const shipsVars = await Promise.all(
    accounts.map(async (account) => {
      return getScoreVarsShipInfo(
        connection,
        new PublicKey(SA_FLEET_PROGRAM_ID),
        new PublicKey(account.shipMint.toString())
      );
    })
  );

  const accountsWithVars = accounts.map((item, i) =>
    Object.assign(item, shipsVars[i])
  );

  const FUEL_PRICE: number = 0.0014336;
  const FOOD_PRICE: number = 0.0006144;
  const ARMS_PRICE: number = 0.0021504;
  const TOOLKIT_PRICE: number = 0.0017408;

  const resDailyConsumption = (burnRate: number) => {
    return Math.round(86400000 / burnRate);
  };

  const resDailyCostInAtlas = (resource: number, burnRate: number) => {
    return Math.round((86400000 / burnRate) * resource * 100000000) / 100000000;
  };

  const dailyMaintenanceCostInAtlas = (
    fuel: number,
    food: number,
    arms: number,
    toolkit: number
  ) => {
    return Math.round((fuel + food + arms + toolkit) * 100000000) / 100000000;
  };

  const grossDailyRewardInAtlas = (rewardRatePerSecond: number) => {
    return (
      Math.round(rewardRatePerSecond * 0.00000001 * 60 * 60 * 24 * 100000000) /
      100000000
    );
  };

  const netDailyRewardInAtlas = (
    rewardInAtlas: number,
    maintenanceCostInAtlas: number
  ) => {
    return (
      Math.round((rewardInAtlas - maintenanceCostInAtlas) * 100000000) /
      100000000
    );
  };

  res.status(200).json({
    success: true,
    data: accountsWithVars.map((account) => ({
      owner: account.owner.toString(),
      factionId: account.factionId.toString(),
      shipMint: account.shipMint.toString(),
      shipQuantityInEscrow: account.shipQuantityInEscrow.toNumber(),
      fuelQuantityInEscrow: account.fuelQuantityInEscrow.toNumber(),
      foodQuantityInEscrow: account.foodQuantityInEscrow.toNumber(),
      armsQuantityInEscrow: account.armsQuantityInEscrow.toNumber(),
      fuelCurrentCapacity: account.fuelCurrentCapacity.toNumber(),
      foodCurrentCapacity: account.foodCurrentCapacity.toNumber(),
      armsCurrentCapacity: account.armsCurrentCapacity.toNumber(),
      healthCurrentCapacity: account.healthCurrentCapacity.toNumber(),
      stakedAtTimestamp: account.stakedAtTimestamp.toNumber(),
      fueledAtTimestamp: account.fueledAtTimestamp.toNumber(),
      fedAtTimestamp: account.fedAtTimestamp.toNumber(),
      armedAtTimestamp: account.armedAtTimestamp.toNumber(),
      repairedAtTimestamp: account.repairedAtTimestamp.toNumber(),
      currentCapacityTimestamp: account.currentCapacityTimestamp.toNumber(),
      totalTimeStaked: account.totalTimeStaked.toNumber(),
      stakedTimePaid: account.stakedTimePaid.toNumber(),
      pendingRewards: account.pendingRewards.toNumber(),
      totalRewardsPaid: account.totalRewardsPaid.toNumber(),
      /* Vars */
      rewardRatePerSecond: account.rewardRatePerSecond.toNumber(),
      fuelMaxReserve: account.fuelMaxReserve,
      foodMaxReserve: account.foodMaxReserve,
      armsMaxReserve: account.armsMaxReserve,
      toolkitMaxReserve: account.toolkitMaxReserve,
      millisecondsToBurnOneFuel: account.millisecondsToBurnOneFuel,
      millisecondsToBurnOneFood: account.millisecondsToBurnOneFood,
      millisecondsToBurnOneArms: account.millisecondsToBurnOneArms,
      millisecondsToBurnOneToolkit: account.millisecondsToBurnOneToolkit,
      /* Custom values */
      dailyFuelConsumption: resDailyConsumption(
        account.millisecondsToBurnOneFuel
      ),
      dailyFoodConsumption: resDailyConsumption(
        account.millisecondsToBurnOneFood
      ),
      dailyArmsConsumption: resDailyConsumption(
        account.millisecondsToBurnOneArms
      ),
      dailyToolkitConsumption: resDailyConsumption(
        account.millisecondsToBurnOneToolkit
      ),
      dailyFuelCostInAtlas: resDailyCostInAtlas(
        FUEL_PRICE,
        account.millisecondsToBurnOneFuel
      ),
      dailyFoodCostInAtlas: resDailyCostInAtlas(
        FOOD_PRICE,
        account.millisecondsToBurnOneFood
      ),
      dailyArmsCostInAtlas: resDailyCostInAtlas(
        ARMS_PRICE,
        account.millisecondsToBurnOneArms
      ),
      dailyToolkitCostInAtlas: resDailyCostInAtlas(
        TOOLKIT_PRICE,
        account.millisecondsToBurnOneToolkit
      ),
      dailyMaintenanceCostInAtlas: dailyMaintenanceCostInAtlas(
        resDailyCostInAtlas(FUEL_PRICE, account.millisecondsToBurnOneFuel),
        resDailyCostInAtlas(FOOD_PRICE, account.millisecondsToBurnOneFood),
        resDailyCostInAtlas(ARMS_PRICE, account.millisecondsToBurnOneArms),
        resDailyCostInAtlas(TOOLKIT_PRICE, account.millisecondsToBurnOneToolkit)
      ),
      grossDailyRewardInAtlas: grossDailyRewardInAtlas(
        account.rewardRatePerSecond.toNumber()
      ),
      netDailyRewardInAtlas: netDailyRewardInAtlas(
        grossDailyRewardInAtlas(account.rewardRatePerSecond.toNumber()),
        dailyMaintenanceCostInAtlas(
          resDailyCostInAtlas(FUEL_PRICE, account.millisecondsToBurnOneFuel),
          resDailyCostInAtlas(FOOD_PRICE, account.millisecondsToBurnOneFood),
          resDailyCostInAtlas(ARMS_PRICE, account.millisecondsToBurnOneArms),
          resDailyCostInAtlas(
            TOOLKIT_PRICE,
            account.millisecondsToBurnOneToolkit
          )
        )
      ),
    })),
  });
};
