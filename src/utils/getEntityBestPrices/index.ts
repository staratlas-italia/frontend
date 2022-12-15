import { Connection, PublicKey } from "@solana/web3.js";
import { gmClientService } from "~/common/constants";
import { BestPrices, Currency } from "~/types";
import { getConnectionClusterUrl } from "~/utils/connection";
import { getAssetOrderBook } from "~/utils/getAssetOrderbook";

export const getEntityBestPrices = async (
  mint: string,
  currency: Exclude<Currency, "POLIS"> = "USDC"
): Promise<BestPrices | undefined> => {
  const connection = new Connection(getConnectionClusterUrl("mainnet-beta"));

  const result = await getAssetOrderBook(
    gmClientService,
    connection,
    new PublicKey(mint)
  );

  const currencyKey = currency.toLowerCase() as Lowercase<typeof currency>;

  const bestAskPrice = Math.min(
    ...result[currencyKey].sell.map((o) => o.uiPrice)
  );

  const bestBidPrice = Math.max(
    ...result[currencyKey].buy.map((o) => o.uiPrice)
  );

  return {
    avgPrice: (bestAskPrice + bestBidPrice) / 2,
    bestAskPrice,
    bestBidPrice,
  };
};
