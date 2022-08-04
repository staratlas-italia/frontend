import type { NextApiRequest, NextApiResponse } from "next";
import { STAR_ATLAS_SERUM_PROGRAM_ID } from "~/common/constants";
import { getOrderbook } from "~/network/orderbook";

const handler = async ({ query }: NextApiRequest, res: NextApiResponse) => {
  const { marketId, programId } = query;

  if (!marketId) {
    res.status(404).json({
      error: "Invalid market id",
    });
  }

  let data = await getOrderbook(
    marketId as string,
    (programId as string) || STAR_ATLAS_SERUM_PROGRAM_ID
  );

  res.status(200).json(data);
};

export default handler;
