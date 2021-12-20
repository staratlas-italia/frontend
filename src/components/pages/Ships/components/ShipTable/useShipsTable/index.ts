import { useCallback, useState } from "react";
import { useAtlasPrice } from "~/hooks/useAtlasPrice";
import { Currency, StarAtlasEntity } from "~/types";
import { getEntityVwapPrice } from "~/utils/getEntityVwapPrice";
import { getMarketLastPrice } from "~/utils/getMarketLastPrice";

type ShipTableRow = {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  atlasPrice: number;
  bestAskPrice: number;
  bestBidPrice: number;
  priceVsVwapPrice: number;
  atlasPriceVsVwapPrice: number;
  bestBidPriceVsVwapPrice: number;
  bestAskPriceVsVwapPrice: number;
  vwapPrice: number;
};

export const useShipsTable = (
  ships: StarAtlasEntity[],
  currency: Currency = "USDC"
): [
  VoidFunction,
  { data: Partial<ShipTableRow>[]; atlasPrice: number; loading: boolean }
] => {
  const { price: atlasPrice } = useAtlasPrice();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Partial<ShipTableRow>[]>([]);

  const fetch = useCallback(async () => {
    if (!atlasPrice) return;

    setLoading(true);

    const result = await Promise.all(
      ships.map(async (ship) => {
        const usdcMarket = ship.markets.find(
          (market) => market.quotePair === "USDC"
        );

        const atlasMarker = ship.markets.find(
          (market) => market.quotePair === "ATLAS"
        );

        const vwapPrice =
          getEntityVwapPrice(ship.primarySales) /
          (currency === "ATLAS" ? atlasPrice : 1);

        let result: Partial<ShipTableRow> = {
          id: ship._id,
          imageUrl: ship.media.thumbnailUrl,
          name: ship.name,
          vwapPrice,
        };

        if (usdcMarket) {
          const price = await getMarketLastPrice(usdcMarket.id);
          result = {
            ...result,
            price,
            priceVsVwapPrice: (1 - price / vwapPrice) * 100,
          };
        }

        if (atlasMarker) {
          const atlasMarketPrice = await getMarketLastPrice(atlasMarker.id);
          result = {
            ...result,
            atlasPrice: atlasMarketPrice,
            atlasPriceVsVwapPrice:
              (1 - (atlasMarketPrice * atlasPrice) / vwapPrice) * 100,
          };
        }

        const bestPrices = {
          bestAskPrice: 0,
          bestBidPrice: result?.price || 0,
        }; //await getEntityBestPrices(ship.markets, currency);

        if (bestPrices) {
          const { bestBidPrice, bestAskPrice } = bestPrices;
          result = {
            ...result,
            bestAskPrice,
            bestAskPriceVsVwapPrice: (1 - bestAskPrice / vwapPrice) * 100,
            bestBidPrice,
            bestBidPriceVsVwapPrice: (1 - bestBidPrice / vwapPrice) * 100,
          };
        }

        return result;
      })
    );
    setData(result);
    setLoading(false);
  }, [atlasPrice, currency, ships]);

  return [fetch, { data, atlasPrice: atlasPrice || 0, loading }];
};
