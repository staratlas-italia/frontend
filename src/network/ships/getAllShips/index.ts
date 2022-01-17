import axios from "axios";
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
