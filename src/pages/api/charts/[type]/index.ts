import type { NextApiRequest, NextApiResponse } from "next";
import { getAllShips } from "~/network/ships/getAllShips";
import { queryAvgShipsQuantity } from "~/queries/queryAvgShipsQuantity";
import { queryFactionMemebers } from "~/queries/queryFactionMembers";
import { queryFactionTiers } from "~/queries/queryFactionTiers";
import { ChartType } from "~/utils/getRoute";

const getFactionName = (faction: 0 | 1 | 2) => {
  switch (faction) {
    case 0:
      return "MUD";
    case 1:
      return "ONI";
    default:
      return "USTUR";
  }
};

const getTierName = (tier: 0 | 1 | 2) => {
  switch (tier) {
    case 0:
      return "320$";
    case 1:
      return "500$";
    default:
      return "1000$";
  }
};

export default async ({ query }: NextApiRequest, res: NextApiResponse) => {
  const { type } = query;

  const chartType = type as ChartType;

  switch (chartType) {
    case "avg-ship-quantity":
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

      return res
        .status(200)
        .json({ total: Math.round(totalShips), data: playerShipsData });

    case "faction-pie":
      const members = await queryFactionMemebers();

      const total = members.reduce(
        (sum, item) => (sum += item.total_member),
        0
      );

      const data = members.map(({ faction, total_member }) => ({
        label: getFactionName(faction),
        value: Math.round((total_member / total) * 10000) / 100,
      }));

      return res.status(200).json({ data });
    case "faction-tiers-pie":
      const tiers = await queryFactionTiers();

      const tiersData = tiers.map(({ tier, quantity }) => ({
        label: getTierName(tier),
        value: quantity,
      }));

      return res.status(200).json({ data: tiersData });
    default:
      res.status(200).json({ message: "Pie type not available" });
  }
};
