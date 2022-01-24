import { Connection, PublicKey } from "@solana/web3.js";
import {
  getAllFleetsForUserPublicKey,
  getScoreVarsShipInfo,
} from "@staratlas/factory";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  ARMS_PRICE,
  FOOD_PRICE,
  FUEL_PRICE,
  SA_FLEET_PROGRAM_ID,
  TOOLKIT_PRICE,
} from "~/common/constants";
import { ScoreFleetResponse } from "~/types/api";
import { getConnectionContext } from "~/utils/connection";
import { dailyMaintenanceCostInAtlas } from "~/utils/dailyMaintenanceCostInAtlas";
import { grossDailyRewardInAtlas } from "~/utils/grossDailyRewardInAtlas";
import { netDailyRewardInAtlas } from "~/utils/netDailyRewardInAtlas";
import { isPublicKey } from "~/utils/pubkey";
import { resDailyConsumption } from "~/utils/resDailyConsumption";
import { resDailyCostInAtlas } from "~/utils/resDailyCostInAtlas";

const connection = new Connection(
  getConnectionContext("mainnet-beta").endpoint
);

// TODO
// const cors = initMiddleware(
//   Cors({
//     origin:
//       "https://app.staratlasitalia.com, https://fleet.staratlasitalia.com",
//     methods: ["GET", "OPTIONS"],
//     preflightContinue: false,
//     optionsSuccessStatus: 204,
//   })
// );

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
    accounts.map((account) => {
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
        account.millisecondsToBurnOneFuel,
        account.shipQuantityInEscrow.toNumber()
      ),
      dailyFoodConsumption: resDailyConsumption(
        account.millisecondsToBurnOneFood,
        account.shipQuantityInEscrow.toNumber()
      ),
      dailyArmsConsumption: resDailyConsumption(
        account.millisecondsToBurnOneArms,
        account.shipQuantityInEscrow.toNumber()
      ),
      dailyToolkitConsumption: resDailyConsumption(
        account.millisecondsToBurnOneToolkit,
        account.shipQuantityInEscrow.toNumber()
      ),
      dailyFuelCostInAtlas: resDailyCostInAtlas(
        FUEL_PRICE,
        account.millisecondsToBurnOneFuel,
        account.shipQuantityInEscrow.toNumber()
      ),
      dailyFoodCostInAtlas: resDailyCostInAtlas(
        FOOD_PRICE,
        account.millisecondsToBurnOneFood,
        account.shipQuantityInEscrow.toNumber()
      ),
      dailyArmsCostInAtlas: resDailyCostInAtlas(
        ARMS_PRICE,
        account.millisecondsToBurnOneArms,
        account.shipQuantityInEscrow.toNumber()
      ),
      dailyToolkitCostInAtlas: resDailyCostInAtlas(
        TOOLKIT_PRICE,
        account.millisecondsToBurnOneToolkit,
        account.shipQuantityInEscrow.toNumber()
      ),
      dailyMaintenanceCostInAtlas: dailyMaintenanceCostInAtlas(
        resDailyCostInAtlas(
          FUEL_PRICE,
          account.millisecondsToBurnOneFuel,
          account.shipQuantityInEscrow.toNumber()
        ),
        resDailyCostInAtlas(
          FOOD_PRICE,
          account.millisecondsToBurnOneFood,
          account.shipQuantityInEscrow.toNumber()
        ),
        resDailyCostInAtlas(
          ARMS_PRICE,
          account.millisecondsToBurnOneArms,
          account.shipQuantityInEscrow.toNumber()
        ),
        resDailyCostInAtlas(
          TOOLKIT_PRICE,
          account.millisecondsToBurnOneToolkit,
          account.shipQuantityInEscrow.toNumber()
        )
      ),
      grossDailyRewardInAtlas: grossDailyRewardInAtlas(
        account.rewardRatePerSecond.toNumber(),
        account.shipQuantityInEscrow.toNumber()
      ),
      netDailyRewardInAtlas: netDailyRewardInAtlas(
        grossDailyRewardInAtlas(
          account.rewardRatePerSecond.toNumber(),
          account.shipQuantityInEscrow.toNumber()
        ),
        dailyMaintenanceCostInAtlas(
          resDailyCostInAtlas(
            FUEL_PRICE,
            account.millisecondsToBurnOneFuel,
            account.shipQuantityInEscrow.toNumber()
          ),
          resDailyCostInAtlas(
            FOOD_PRICE,
            account.millisecondsToBurnOneFood,
            account.shipQuantityInEscrow.toNumber()
          ),
          resDailyCostInAtlas(
            ARMS_PRICE,
            account.millisecondsToBurnOneArms,
            account.shipQuantityInEscrow.toNumber()
          ),
          resDailyCostInAtlas(
            TOOLKIT_PRICE,
            account.millisecondsToBurnOneToolkit,
            account.shipQuantityInEscrow.toNumber()
          )
        )
      ),
    })),
  });
};
