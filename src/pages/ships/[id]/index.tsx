import { ArrowLeftIcon } from "@heroicons/react/solid";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { ShipPrices } from "~/components/cards/Ship/components/ShipPrices";
import { StarAtlasEntity } from "~/components/cards/Ship/types";
import { Text } from "~/components/common/Text";
import { Flex } from "~/components/layout/Flex";
import { ShipAttributes } from "~/components/ShipAttributes";
import { useShip } from "~/hooks/useShip";

type Props = {
  ship: StarAtlasEntity;
};

const ShipDetails = ({ ship }: Props) => {
  console.log(ship);

  const { saleIsNotBegin, saleDate } = useShip(ship);

  return (
    <Flex
      direction="col"
      className="space-y-5 bg-black backdrop-filter backdrop-blur-lg bg-opacity-20 p-5 "
    >
      <Link href="/ships">
        <a>
          <ArrowLeftIcon className="h-8 w-8 text-white" />
        </a>
      </Link>

      <Text
        color="white"
        className="col-span-3"
        size="4xl"
        mdSize="6xl"
        weight="extrabold"
      >
        {ship.name}
      </Text>

      <Flex direction="col" className="grid grid-cols-3 gap-5 text-white ">
        <Flex justify="center" className="col-span-3 lg:col-span-1">
          <img className="object-cover" src={ship.image} />
        </Flex>
        <Flex
          direction="col"
          className="col-span-3 lg:col-span-2 space-y-5"
          justify="center"
        >
          {saleIsNotBegin ? (
            <Text transform="uppercase" weight="medium">
              Official sale date - {saleDate.toLocaleString()}
            </Text>
          ) : (
            <ShipPrices ship={ship} />
          )}
          <Flex direction="col" className="space-y-5">
            <Flex direction="col" className="space-y-3">
              <Text
                size="xl"
                mdSize="3xl"
                weight="semibold"
                transform="uppercase"
              >
                {ship.attributes.spec} - {ship.attributes.rarity}
              </Text>
            </Flex>
            <Text size="xl" color="gray-100">
              {ship.description}
            </Text>
          </Flex>
        </Flex>
        <Flex direction="col" className="col-span-3">
          <ShipAttributes
            attrs={ship.slots.componentSlots}
            title="Components"
          />

          <ShipAttributes attrs={ship.slots.crewSlots} pt={10} title="Crew" />

          <ShipAttributes
            attrs={ship.slots.moduleSlots}
            pt={10}
            title="Modules"
          />

          <Flex pt={16} className="grid grid-cols-3">
            {ship.media.gallery.map((imageUrl, index) => (
              <Flex
                key={index.toString()}
                className="max-h-72 col-span-3 lg:col-span-1 "
              >
                <img
                  src={imageUrl}
                  className="transition duration-500 ease-in-out h-full w-full bg-auto bg-no-repeat bg-center object-cover transform hover:scale-95"
                />
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
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
