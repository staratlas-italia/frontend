import { ShipSize, StarAtlasEntity } from "~/types";

const shipSizes: Record<ShipSize, number> = {
  "xx-small": 0,
  "x-small": 1,
  small: 2,
  medium: 3,
  large: 4,
  capital: 5,
  commander: 6,
  titan: 7,
};

const sortBySize = (shipA: StarAtlasEntity, shipB: StarAtlasEntity) =>
  shipSizes[shipA.attributes.class.toLowerCase()] -
  shipSizes[shipB.attributes.class.toLowerCase()];

export const sortShipBySize = (ships: StarAtlasEntity[]) => {
  let mutableShips = [...ships];
  mutableShips.sort(sortBySize);

  return mutableShips;
};
