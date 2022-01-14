import axios from "axios";
import { getOrderbook } from "~/network/orderbook";
import { ShipSize, StarAtlasEntity } from "~/types";
import { sortShipBySize } from "~/utils/sortShipBySize";

export const getAllShips = async (
  size?: ShipSize
): Promise<StarAtlasEntity[]> => {
  const response = await axios.get(`${process.env.STAR_ATLAS_API_URL}/nfts`);
  let ships = response.data.filter(
    (ship) => ship.attributes.category === "ship"
  );

  if (size) {
    ships = ships.filter(
      (s: StarAtlasEntity) =>
        s.attributes.class.toLocaleLowerCase() === size.toLocaleLowerCase()
    );
  }

  return sortShipBySize(ships);
};

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
