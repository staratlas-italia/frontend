import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { StarAtlasEntity } from "~/types";

const shipSizes = {
  "xx-small": 0,
  "x-small": 1,
  small: 2,
  medium: 3,
  large: 4,
  capital: 5,
  commander: 6,
};

const sortForSize = (shipA: StarAtlasEntity, shipB: StarAtlasEntity) => {
  return (
    shipSizes[shipA.attributes.class.toLowerCase()] -
    shipSizes[shipB.attributes.class.toLowerCase()]
  );
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await axios.get(process.env.STAR_ATLAS_NFTS_URL || "");
  const ships = response.data.filter(
    (ship) => ship.attributes.category === "ship"
  );
  ships.sort(sortForSize);

  res.status(200).json(ships);
};
