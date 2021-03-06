import type { NextApiResponse } from "next";
import { getAllShips } from "~/network/ships/getAllShips";

export default async (_, res: NextApiResponse) => {
  const ships = await getAllShips();

  res.status(200).json(ships);
};
