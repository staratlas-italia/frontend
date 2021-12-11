import { DependencyList, useEffect, useState } from "react";
import { useAtlasPrice } from "~/hooks/useAtlasPrice";
import { StarAtlasEntity } from "~/types";
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

type Currency = "ATLAS" | "USDC";

export const useShipsTable = (
  ships: StarAtlasEntity[],
  currency: Currency = "USDC",
  deps: DependencyList = []
) => {
  const { price: atlasPrice } = useAtlasPrice();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ShipTableRow[]>([]);

  useEffect(() => {
    if (!atlasPrice) return;
    const run = async () => {
      setLoading(true);

      const result = await Promise.all(
        ships.map(async (ship) => {
          const { price, bestBidPrice, bestAskPrice } =
            await getEntityBestPrices(ship.markets, currency);

          const vwapPrice =
            getEntityVwapPrice(ship.primarySales) /
            (currency === "ATLAS" ? atlasPrice : 1);

          return {
            id: ship._id,
            bestAskPrice,
            bestBidPrice,
            imageUrl: ship.media.thumbnailUrl,
            name: ship.name,
            price,
            vwapPrice,
            priceVsVwapPrice: (1 - price / vwapPrice) * 100,
            bestAskPriceVsVwapPrice: (1 - bestAskPrice / vwapPrice) * 100,
            bestBidPriceVsVwapPrice: (1 - bestBidPrice / vwapPrice) * 100,
          };
        })
      );
      setData(result);
      setLoading(false);
    };
    run();
  }, [atlasPrice, ...deps]);

  return { data, loading };
};
