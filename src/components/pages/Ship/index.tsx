import { ArrowLeftIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useIntl } from "react-intl";
import { Text } from "~/components/common/Text";
import { Flex } from "~/components/layout/Flex";
import { ShipAttributes } from "~/components/pages/Ship/components/ShipAttributes";
import { ShipPrices } from "~/components/pages/Ship/components/ShipPrices";
import { useShip } from "~/contexts/ShipsContext";
import { Translation } from "~/i18n/Translation";
import { TranslationId } from "~/i18n/translations/types";
import { useTranslation } from "~/i18n/useTranslation";

export const ShipPage = () => {
  const intl = useIntl();

  const {
    attributes,
    description,
    image,
    name,
    media,
    saleDate,
    saleIsNotBegin,
    slots,
  } = useShip();

  const componentsTranslation = useTranslation(
    "Ships.Details.Components.title"
  );
  const crewTranslation = useTranslation("Ships.Details.Crew.title");
  const modulesTranslation = useTranslation("Ships.Details.Modules.title");

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
        {name}
      </Text>

      <Flex direction="col" className="grid grid-cols-3 gap-5 text-white ">
        <Flex justify="center" className="col-span-3 lg:col-span-1">
          <img className="object-cover" src={image} />
        </Flex>
        <Flex
          direction="col"
          className="col-span-3 lg:col-span-2 space-y-5"
          justify="center"
        >
          {saleIsNotBegin ? (
            <Text transform="uppercase" weight="medium">
              <Translation
                id={"Ships.Details.saleDate"}
                values={{ date: saleDate?.toLocaleString() || "" }}
              />
            </Text>
          ) : (
            <ShipPrices />
          )}
          <Flex direction="col" className="space-y-5">
            <Flex direction="col" className="space-y-3">
              <Text
                size="xl"
                mdSize="3xl"
                weight="semibold"
                transform="uppercase"
              >
                {attributes?.spec} - {attributes?.rarity}
              </Text>
            </Flex>
            <Text size="xl" color="gray-100">
              <Translation
                id={
                  `Ships.Details.${name
                    ?.toLocaleLowerCase()
                    .replace(/ /g, "_")}.description` as TranslationId
                }
                defaultMessage={description}
              />
            </Text>
          </Flex>
        </Flex>
        <Flex direction="col" className="col-span-3">
          <ShipAttributes
            attrs={slots?.componentSlots}
            title={componentsTranslation}
          />

          <ShipAttributes
            attrs={slots?.crewSlots}
            pt={10}
            title={crewTranslation}
          />

          <ShipAttributes
            attrs={slots?.moduleSlots}
            pt={10}
            title={modulesTranslation}
          />

          <Flex pt={16} className="grid grid-cols-3">
            {media?.gallery?.map((imageUrl, index) => (
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
