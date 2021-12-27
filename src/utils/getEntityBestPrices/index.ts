import axios from "axios";
import { BestPrices } from "~/network/orderbook";
import { Currency, Market } from "~/types";

export const getEntityBestPrices = async (
  markets: Market[],
  currency: Currency = "USDC"
): Promise<BestPrices | undefined> => {
  const market = markets.find((market) => market.quotePair === currency);

  if (market) {
    const result = await axios.get<BestPrices>(
      `/api/orderbook?marketId=${market.id}`
    );

    return result.data;
  }

  return Promise.resolve(undefined);
};
