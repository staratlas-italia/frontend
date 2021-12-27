import { Market } from "@project-serum/serum";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

let connection = new Connection(
  process.env.MAIN_RPC_ENDPOINT ||
    process.env.BACKUP_RPC_ENDPOINT ||
    clusterApiUrl("mainnet-beta"),
  "confirmed"
);

export const getOrderbook = async (
  marketId: string,
  serumProgramId: string
) => {
  let market = await Market.load(
    connection,
    new PublicKey(marketId),
    {},
    new PublicKey(serumProgramId)
  );

  let bids = await market.loadBids(connection);
  let asks = await market.loadAsks(connection);

  const asksL2 = asks.getL2(1);
  const bidsL2 = bids.getL2(1);

  const [bestAskPrice] = asksL2?.length ? asksL2[0] : [0];
  const [bestBidPrice] = bidsL2?.length ? bidsL2[0] : [0];

  return {
    avgPrice: (bestAskPrice + bestBidPrice) / 2,
    bestAskPrice,
    bestBidPrice,
  };
};
