import type { NextApiRequest, NextApiResponse } from "next";
import { getAllShipsWithPrices } from "~/network/ships/getAllShipsWithPrices";
import { ShipSize } from "~/types";

const handler = async ({ query }: NextApiRequest, res: NextApiResponse) => {
  const { size } = query;

  const ships = await getAllShipsWithPrices(size as ShipSize);

  res.status(200).json(ships);
};

export default handler;
