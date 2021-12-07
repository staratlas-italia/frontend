import React from "react";
import { Description } from "~/components/cards/Ship/components/Description";
import { Heading } from "~/components/cards/Ship/components/Heading";
import { Image } from "~/components/cards/Ship/components/Image";
import { Polygon } from "~/components/cards/Ship/components/Polygon";
import { StarAtlasEntity } from "~/components/cards/Ship/types";
import { MaxWidth } from "~/components/layout/MaxWidth";
import { ColorName } from "~/components/layout/Pane";

type Props = { ship: StarAtlasEntity };

const shipColors: { [key: string]: ColorName } = {
  "xx-small": "gray-600",
  "x-small": "indigo-600",
  small: "red-600",
  medium: "green-500",
  large: "pink-600",
  capital: "purple-600",
};

export const ShipCard = ({ ship }: Props) => {
  return (
    <div className="rounded-3xl relative bg-white overflow-hidden shadow-xl">
      <Image src={ship.image} alt={ship.name} />
      <MaxWidth className="mx-auto" size="7xl">
        <div className="lg:float-right relative pb-8 sm:pb-16 md:pb-20 lg:max-w-lg	xl:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <Polygon />

          <main className="relative z-10 pt-5 mx-auto w-full px-4 sm:pt-12 sm:px-6 md:pt-16 lg:pt-20 lg:px-8 xl:pt-28">
            <div className="lg:pl-10 sm:text-center lg:text-left">
              <Heading
                color={shipColors[ship.attributes.class]}
                title={ship.name}
                subtitle={ship.attributes.class}
              />
              <div className="mt-3 sm:mt-5 sm:max-w-xl sm:mx-auto md:mt-5 lg:mx-0">
                <Description text={ship.description} />
              </div>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a
                    href={`https://play.staratlas.com/market/${ship.markets[0].id}`}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                    target="_blank"
                  >
                    Buy
                  </a>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a className="w-full cursor-disabled opacity-50 flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 md:py-4 md:text-lg md:px-10">
                    Read more
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </MaxWidth>
    </div>
  );
};
