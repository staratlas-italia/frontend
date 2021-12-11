import axios from "axios";
import React from "react";
import { ShipPage } from "~/components/pages/Ship";
import { ShipProvider } from "~/contexts/ShipContext";
import { StarAtlasEntity } from "~/types";

type Props = {
  ship: StarAtlasEntity;
};

const ShipDetails = ({ ship }: Props) => {
  return (
    <ShipProvider ship={ship}>
      <ShipPage />
    </ShipProvider>
  );
};

export async function getServerSideProps({ params }) {
  const { id } = params;
  const res = await axios.get(process.env.STAR_ATLAS_NFTS_URL);
  const ship = res.data.find((nft) => nft._id === id);

  return {
    props: {
      ship,
    },
  };
}

export default ShipDetails;
