import { useCallback, useState } from "react";
import { useAtlasPrice } from "~/hooks/useAtlasPrice";
import { Currency, StarAtlasEntity } from "~/types";
import { getEntityBestPrices } from "~/utils/getEntityBestPrices";
import { getEntityVwapPrice } from "~/utils/getEntityVwapPrice";

type ShipTableRow = {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  bestAskPrice: number;
  bestBidPrice: number;
  priceVsVwapPrice: number;
  bestBidPriceVsVwapPrice: number;
  bestAskPriceVsVwapPrice: number;
  vwapPrice: number;
};

export const useShipsTable = (
  ships: StarAtlasEntity[],
  currency: Currency = "USDC"
): [VoidFunction, { data: Partial<ShipTableRow>[]; loading: boolean }] => {
  const { price: atlasPrice } = useAtlasPrice();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Partial<ShipTableRow>[]>([]);

  const fetch = useCallback(async () => {
    if (!atlasPrice) return;

    setLoading(true);

    const result = await Promise.all(
      ships.map(async (ship) => {
        let result: Partial<ShipTableRow> = {
          id: ship._id,
          imageUrl: ship.media.thumbnailUrl,
          name: ship.name,
        };

        const bestPrices = await getEntityBestPrices(ship.markets, currency);

        const vwapPrice =
          getEntityVwapPrice(ship.primarySales) /
          (currency === "ATLAS" ? atlasPrice : 1);

        if (bestPrices) {
          const { price, bestBidPrice, bestAskPrice } = bestPrices;
          result = {
            ...result,
            bestAskPrice,
            bestAskPriceVsVwapPrice: (1 - bestAskPrice / vwapPrice) * 100,
            bestBidPrice,
            bestBidPriceVsVwapPrice: (1 - bestBidPrice / vwapPrice) * 100,
            price,
            priceVsVwapPrice: (1 - price / vwapPrice) * 100,
          };
        }

        return result;
      })
    );
    setData(result);
    setLoading(false);
  }, [atlasPrice, currency, ships]);

  return [fetch, { data, loading }];
};
