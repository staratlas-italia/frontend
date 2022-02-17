import type { NextApiRequest, NextApiResponse } from "next";

type ChartType = "FactionPie";

export default async ({ query }: NextApiRequest, res: NextApiResponse) => {
  const { type } = query;

  const chartType = type as ChartType;

  switch (chartType) {
    case "FactionPie":
      return res.status(200).json([
        [0, 103],
        [1, 320],
        [2, 189],
      ]);
      break;
    default:
      res.status(200).json({ message: "Pie type not available" });
  }
};
