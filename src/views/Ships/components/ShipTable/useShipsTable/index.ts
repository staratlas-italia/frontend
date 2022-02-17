import { useCallback, useState } from "react";
import { useAtlasPrice } from "~/hooks/useAtlasPrice";
import { useShips } from "~/hooks/useShips";
import { appendQueryParams } from "~/utils/appendQueryParams";
import { getEntityVwapPrice } from "~/utils/getEntityVwapPrice";
import { getRoute } from "~/utils/getRoute";

type ShipTableRow = {
  id: string;
  imageUrl: string;
  name: string;
  vwapPrice: number;
  atlasBuyPrice: number;
  buyPriceVsVwapPrice: number;
  atlasBuyPriceVsVwapPrice: number;
  buyPrice: number;
  atlasSellPrice: number;
  sellPriceVsVwapPrice: number;
  atlasSellPriceVsVwapPrice: number;
  sellPrice: number;
};

const fetcher = (url) => fetch(url).then((res) => res.json());

type UseShipsTableResult = [
  VoidFunction,
  { data: Partial<ShipTableRow>[]; atlasPrice: number }
];

export type MarketAction = "buy" | "sell";

export const useShipsTable = (): UseShipsTableResult => {
  const { price: atlasValue } = useAtlasPrice();

  const { ships } = useShips();

  const [data, setData] = useState<Record<string, Partial<ShipTableRow>>>(() =>
    Object.fromEntries(
      ships.map((ship) => {
        const vwapPrice = getEntityVwapPrice(ship.primarySales);

        return [
          ship.mint,
          {
            id: ship._id,
            imageUrl: ship?.media?.thumbnailUrl,
            name: ship.name,
            vwapPrice,
          },
        ];
      })
    )
  );

  const fetch = useCallback(async () => {
    if (!atlasValue) return;

    ships.forEach(async (ship) => {
      const usdcMarket = ship.markets.find((m) => m.quotePair === "USDC");
      const atlasMarket = ship.markets.find((m) => m.quotePair === "ATLAS");
      const usdcOrderBook = await fetcher(
        appendQueryParams(getRoute("/api/orderbook"), {
          marketId: usdcMarket?.id || "",
        })
      );
      const atlasOrderBook = await fetcher(
        appendQueryParams(getRoute("/api/orderbook"), {
          marketId: atlasMarket?.id || "",
        })
      );
      const vwapPrice = getEntityVwapPrice(ship.primarySales);
      const buyPrice = usdcOrderBook?.bestAskPrice || 0;
      const sellPrice = usdcOrderBook?.bestBidPrice || 0;
      const atlasBuyPrice = atlasOrderBook?.bestAskPrice || 0;
      const atlasSellPrice = atlasOrderBook?.bestBidPrice || 0;

      setData((data) => ({
        ...data,
        [ship.mint]: {
          id: ship._id,
          imageUrl: ship?.media?.thumbnailUrl,
          name: ship.name,
          vwapPrice,
          atlasBuyPrice,
          buyPriceVsVwapPrice: buyPrice
            ? (1 - buyPrice / vwapPrice) * 100
            : undefined,
          atlasBuyPriceVsVwapPrice: atlasBuyPrice
            ? (1 - (atlasBuyPrice * atlasValue) / vwapPrice) * 100
            : undefined,
          buyPrice,
          atlasSellPrice,
          sellPriceVsVwapPrice: sellPrice
            ? (1 - sellPrice / vwapPrice) * 100 * -1
            : undefined,
          atlasSellPriceVsVwapPrice: atlasSellPrice
            ? (1 - (atlasSellPrice * atlasValue) / vwapPrice) * 100 * -1
            : undefined,
          sellPrice,
        },
      }));
    });
  }, [atlasValue, ships]);

  return [
    fetch,
    {
      data: Object.values(data || {}),
      atlasPrice: atlasValue || 0,
    },
  ];
};
