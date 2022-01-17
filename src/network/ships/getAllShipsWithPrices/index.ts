import { getOrderbook } from "~/network/orderbook";
import { getAllShips } from "~/network/ships/getAllShips";
import { ShipSize, StarAtlasEntity } from "~/types";

type EntityPrices = {
  avgPrice: number;
  bestAskPrice: number;
  bestBidPrice: number;
};

type StarAtlasEntityExtended = StarAtlasEntity & {
  usdc?: EntityPrices;
  atlas?: EntityPrices;
};

export const getAllShipsWithPrices = async (
  size?: ShipSize,
  progressCb?: (index: number) => void
): Promise<StarAtlasEntityExtended[]> => {
  const ships = await getAllShips(size);

  const result: StarAtlasEntityExtended[] = [];

  let currentItem: StarAtlasEntityExtended;

  for (let [index, ship] of Object.entries(ships)) {
    const usdcMarket = ship.markets.find((m) => m.quotePair === "USDC");
    const atlasMarket = ship.markets.find((m) => m.quotePair === "ATLAS");

    currentItem = ship;

    if (usdcMarket) {
      const usdcOrderbook = await getOrderbook(
        usdcMarket.id,
        usdcMarket.serumProgramId
      );

      currentItem = {
        ...currentItem,
        usdc: usdcOrderbook,
      };
    }

    if (atlasMarket) {
      const atlasOrderbook = await getOrderbook(
        atlasMarket.id,
        atlasMarket.serumProgramId
      );
      currentItem = {
        ...currentItem,
        atlas: atlasOrderbook,
      };
    }

    progressCb?.(parseInt(index));
    result.push(currentItem);
  }

  return result;
};
