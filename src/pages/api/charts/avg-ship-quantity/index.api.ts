import type { NextApiRequest, NextApiResponse } from "next";
import { isAdminMiddleware } from "~/middlewares/isAdmin";

import { matchSignatureMiddleware } from "~/middlewares/matchSignature";
import { getAllShips } from "~/network/ships/getAllShips";
import { queryAvgShipsQuantity } from "~/queries/queryAvgShipsQuantity";

const handler = async (_: NextApiRequest, res: NextApiResponse) => {
  const ships = await getAllShips();
  const shipsAvgQuantity = await queryAvgShipsQuantity();

  const totalShips = shipsAvgQuantity.reduce(
    (sum, item) => (sum += item.avgQuantity),
    0
  );

  const playerShipsData = shipsAvgQuantity.map((avg) => {
    const label = ships.find((s) => s.mint === avg.mint)?.name || "";

    return {
      label,
      count: avg.avgQuantity,
      value: Math.round((avg.avgQuantity / totalShips) * 10000) / 100,
    };
  });

  return res.status(200).json({
    data: playerShipsData,
  });
};

export default matchSignatureMiddleware(
  isAdminMiddleware(matchSignatureMiddleware(handler)),
  ["POST"]
);
