import type { NextApiResponse } from "next";
import { getAllShips } from "~/network/ships/getAllShips";

const handler = async (_, res: NextApiResponse) => {
  const ships = await getAllShips();

  res.status(200).json(ships);
};

export default handler;
