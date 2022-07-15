import type { NextApiRequest, NextApiResponse } from "next";
import { getAllShipsWithPrices } from "~/network/ships/getAllShipsWithPrices";
import { ShipSize } from "~/types";

export default async ({ query }: NextApiRequest, res: NextApiResponse) => {
  const { size } = query;

  const ships = await getAllShipsWithPrices(size as ShipSize);

  res.status(200).json(ships);
};
