import { Connection, PublicKey } from "@solana/web3.js";
import { getScoreVarsShipInfo } from "@staratlas/factory";
import type { NextApiRequest, NextApiResponse } from "next";
import { SA_FLEET_PROGRAM_ID } from "~/common/constants";
import { NormalizedScoreVarsShipInfo } from "~/types";
import { getConnectionContext } from "~/utils/connection";
import { isPublicKey } from "~/utils/pubkey";

export type ResponseData =
  | {
      success: false;
      error: string;
    }
  | {
      success: true;
      data: NormalizedScoreVarsShipInfo;
    };

const connection = new Connection(
  getConnectionContext("mainnet-beta").endpoint
);

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const {
    query: { mint },
  } = req;

  if (!isPublicKey(mint as string)) {
    res.status(200).json({
      success: false,
      error: "Invalid mint pubkey",
    });
    return;
  }

  const account = await getScoreVarsShipInfo(
    connection,
    new PublicKey(SA_FLEET_PROGRAM_ID),
    new PublicKey(mint)
  );

  res.status(200).json({
    success: true,
    data: {
      shipMint: account.shipMint.toString(),
      rewardRatePerSecond: account.rewardRatePerSecond.toNumber(),
      fuelMaxReserve: account.fuelMaxReserve,
      foodMaxReserve: account.foodMaxReserve,
      armsMaxReserve: account.armsMaxReserve,
      toolkitMaxReserve: account.toolkitMaxReserve,
      millisecondsToBurnOneFuel: account.millisecondsToBurnOneFuel,
      millisecondsToBurnOneFood: account.millisecondsToBurnOneFood,
      millisecondsToBurnOneArms: account.millisecondsToBurnOneArms,
      millisecondsToBurnOneToolkit: account.millisecondsToBurnOneToolkit,
    },
  });
};
