import create from "zustand";
import { StarAtlasEntity } from "~/types";
import { appendQueryParams } from "~/utils/appendQueryParams";
import { getAtlasMarketPrice } from "~/utils/getAtlasMarketPrice";
import { getEntityVwapPrice } from "~/utils/getEntityVwapPrice";
import { getApiRoute } from "~/utils/getRoute";

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

type ShipsDealsStore = {
  finalized: boolean;
  isFetching: boolean;
  atlasPrice: number;
  data: Record<string, Partial<ShipTableRow>>;
  fetch: (ships: StarAtlasEntity[], force?: boolean) => void;
};

const fetcher = (url) => fetch(url).then((res) => res.json());

export const useShipsDealsStore = create<ShipsDealsStore>((set, get) => ({
  atlasPrice: 0,
  data: {},
  finalized: false,
  isFetching: false,
  fetch: async (ships, force) => {
    if (get().finalized && !force) {
      return;
    }

    const atlasValue = await getAtlasMarketPrice();

    set({
      atlasPrice: atlasValue,
      data: Object.fromEntries(
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
      ),
    });

    await Promise.all(
      ships.map(async (ship) => {
        const usdcMarket = ship.markets.find((m) => m.quotePair === "USDC");
        const atlasMarket = ship.markets.find((m) => m.quotePair === "ATLAS");
        const usdcOrderBook = await fetcher(
          appendQueryParams(getApiRoute("/api/orderbook"), {
            marketId: usdcMarket?.id || "",
          })
        );
        const atlasOrderBook = await fetcher(
          appendQueryParams(getApiRoute("/api/orderbook"), {
            marketId: atlasMarket?.id || "",
          })
        );
        const vwapPrice = getEntityVwapPrice(ship.primarySales);
        const buyPrice = usdcOrderBook?.bestAskPrice || 0;
        const sellPrice = usdcOrderBook?.bestBidPrice || 0;
        const atlasBuyPrice = atlasOrderBook?.bestAskPrice || 0;
        const atlasSellPrice = atlasOrderBook?.bestBidPrice || 0;

        set(({ data }) => ({
          data: {
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
          },
        }));
      })
    );

    set({ finalized: true });
  },
}));
