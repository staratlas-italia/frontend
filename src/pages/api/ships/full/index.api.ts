import { Cluster, clusterApiUrl, Connection } from "@solana/web3.js";
import type { NextApiRequest, NextApiResponse } from "next";
import { attachClusterMiddleware } from "~/middlewares/attachCluster";
import { getAllShipsWithPrices } from "~/network/ships/getAllShipsWithPrices";
import { ShipSize } from "~/types";

const handler = async ({ query }: NextApiRequest, res: NextApiResponse) => {
  const { cluster: clusterParams, size } = query;

  const connection = new Connection(clusterApiUrl(clusterParams as Cluster));

  const ships = await getAllShipsWithPrices(connection, size as ShipSize);

  res.status(200).json(ships);
};

export default attachClusterMiddleware(handler);
