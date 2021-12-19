import axios from "axios";
import { DEXLAB_API_URL } from "~/common/constants";
import { Currency, Market } from "~/types";

type OrderBook = {
  asks: { price: number }[];
  bids: { price: number }[];
};

export type BestPrices = Partial<{
  bestAskPrice: number;
  bestBidPrice: number;
  price: number;
}>;

export const getEntityBestPrices = async (
  markets: Market[],
  currency: Currency = "USDC"
) => {
  const market = markets.find((market) => market.quotePair === currency);

  if (market) {
    const result = await axios.get(`${DEXLAB_API_URL}/orderbooks/${market.id}`);

    const orderbook: OrderBook = result.data.data;

    const bidPrices = orderbook?.bids?.map((i) => i.price) || [0];
    const askPrices = orderbook?.asks?.map((i) => i.price) || [0];

    const bestBidPrice = bidPrices[bidPrices.length - 1];
    const bestAskPrice = askPrices[0];

    return {
      bestAskPrice,
      bestBidPrice,
      price: (bestBidPrice + bestAskPrice) / 2,
    };
  }
};
