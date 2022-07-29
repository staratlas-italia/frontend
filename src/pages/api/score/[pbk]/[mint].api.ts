import { Cluster, clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { getShipStakingAccountInfo } from "@staratlas/factory";
import type { NextApiRequest, NextApiResponse } from "next";
import { SA_FLEET_PROGRAM } from "~/common/constants";
import { attachClusterMiddleware } from "~/middlewares/attachCluster";
import { NormalizedShipStakingInfo } from "~/types";
import { isPublicKey } from "~/utils/pubkey";

export type ResponseData =
  | {
      success: false;
      error: string;
    }
  | {
      success: true;
      data: NormalizedShipStakingInfo;
    };

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const {
    query: { pbk, mint, cluster },
  } = req;

  if (!isPublicKey(pbk as string)) {
    res.status(200).json({
      success: false,
      error: "Invalid pubkey",
    });
    return;
  }

  if (!isPublicKey(mint as string)) {
    res.status(200).json({
      success: false,
      error: "Invalid mint pubkey",
    });
    return;
  }

  const connection = new Connection(clusterApiUrl(cluster as Cluster));

  const account = await getShipStakingAccountInfo(
    connection,
    SA_FLEET_PROGRAM,
    new PublicKey(mint),
    new PublicKey(pbk)
  );

  res.status(200).json({
    success: true,
    data: {
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
    },
  });
};

export default attachClusterMiddleware(handler);
