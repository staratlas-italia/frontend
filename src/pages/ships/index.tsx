import axios from "axios";
import React from "react";
import { ShipCard } from "~/components/cards/Ship";
import { StarAtlasEntity } from "~/components/cards/Ship/types";

type Props = {
  data: StarAtlasEntity[];
};

const shipSizes = {
  "xx-small": 0,
  "x-small": 1,
  small: 2,
  medium: 3,
  large: 4,
  capital: 5,
};

const sortForSize = (shipA: StarAtlasEntity, shipB: StarAtlasEntity) => {
  return shipSizes[shipA.attributes.class] - shipSizes[shipB.attributes.class];
};

const ShipsPage = ({ data }: Props) => {
  return (
    <div className="space-y-10">
      {data.map((ship) => (
        <ShipCard key={ship._id} ship={ship} />
      ))}
    </div>
  );
};

export async function getStaticProps() {
  const res = await axios.get(process.env.STAR_ATLAS_NFTS_URL);
  const ships = res.data.filter((ship) => ship.attributes.category === "ship");
  ships.sort(sortForSize);
  return {
    props: {
      data: ships,
    },
  };
}

export default ShipsPage;
