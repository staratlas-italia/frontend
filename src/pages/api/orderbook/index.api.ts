import { Cluster, clusterApiUrl, Connection } from "@solana/web3.js";
import type { NextApiRequest, NextApiResponse } from "next";
import { STAR_ATLAS_SERUM_PROGRAM_ID } from "~/common/constants";
import { attachClusterMiddleware } from "~/middlewares/attachCluster";
import { getOrderbook } from "~/network/orderbook";

const handler = async ({ query }: NextApiRequest, res: NextApiResponse) => {
  const { marketId, programId, cluster } = query;

  if (!marketId) {
    res.status(404).json({
      error: "Invalid market id",
    });
  }

  const connection = new Connection(clusterApiUrl(cluster as Cluster));

  let data = await getOrderbook(
    connection,
    marketId as string,
    (programId as string) || STAR_ATLAS_SERUM_PROGRAM_ID
  );

  res.status(200).json(data);
};

export default attachClusterMiddleware(handler);
