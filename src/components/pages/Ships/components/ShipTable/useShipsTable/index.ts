import { useCallback, useState } from "react";
import { useAtlasPrice } from "~/hooks/useAtlasPrice";
import { ShipSize } from "~/types";
import { getEntityVwapPrice } from "~/utils/getEntityVwapPrice";

type ShipTableRow = {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  atlasPrice: number;
  bestAskPrice: number;
  bestBidPrice: number;
  priceVsVwapPrice: number;
  atlasPriceVsPrice: number;
  atlasPriceVsVwapPrice: number;
  bestBidPriceVsVwapPrice: number;
  bestAskPriceVsVwapPrice: number;
  vwapPrice: number;
};

const fetcher = (url) => fetch(url).then((res) => res.json());

export const useShipsTable = (
  size: ShipSize
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

    const result = await fetcher(`/api/ships/full?size=${size}`);

    const final = result.map((ship) => {
      const vwapPrice = getEntityVwapPrice(ship.primarySales);
      const price = ship.usdc?.bestAskPrice || 0;
      const atlasMarketPrice = ship.atlas?.bestAskPrice || 0;
      const bestBidPrice = ship.usdc?.bestBidPrice || 0;

      return {
        id: ship._id,
        imageUrl: ship?.media?.thumbnailUrl,
        name: ship.name,
        vwapPrice,
        atlasPrice: atlasMarketPrice,
        atlasPriceVsPrice: atlasMarketPrice
          ? (1 - (atlasMarketPrice * atlasPrice) / (price || 1)) * 100
          : null,
        atlasPriceVsVwapPrice: atlasMarketPrice
          ? (1 - (atlasMarketPrice * atlasPrice) / vwapPrice) * 100
          : null,
        price,
        priceVsVwapPrice: (1 - price / vwapPrice) * 100,
        bestAskPrice: price,
        bestAskPriceVsVwapPrice: (1 - price / vwapPrice) * 100,
        bestBidPrice,
        bestBidPriceVsVwapPrice: (1 - bestBidPrice / vwapPrice) * 100,
      };
    });

    setData(final);
    setLoading(false);
  }, [atlasPrice, size]);

  return [fetch, { data, atlasPrice: atlasPrice || 0, loading }];
};
