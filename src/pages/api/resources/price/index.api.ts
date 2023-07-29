import { NextApiResponse } from "next";
import {
  AMMO_TOKEN_MINT_ID,
  FOOD_TOKEN_MINT_ID,
  FUEL_TOKEN_MINT_ID,
  TOOL_TOKEN_MINT_ID,
} from "~/common/constants/index";
import { getEntityBestPrices } from "~/utils/getEntityBestPrices";

const handler = async (_, res: NextApiResponse) => {
  const food = await getEntityBestPrices(FOOD_TOKEN_MINT_ID, "ATLAS");
  const fuel = await getEntityBestPrices(FUEL_TOKEN_MINT_ID, "ATLAS");
  const ammo = await getEntityBestPrices(AMMO_TOKEN_MINT_ID, "ATLAS");
  const tools = await getEntityBestPrices(TOOL_TOKEN_MINT_ID, "ATLAS");

  res.status(200).json({
    success: true,
    data: {
      food,
      fuel,
      ammo,
      tools,
    },
  });
};

export default handler;
