import { ArrowLeftIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { Text } from "~/components/common/Text";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Container } from "~/components/layout/Container";
import { Flex } from "~/components/layout/Flex";
import { useShip } from "~/hooks/useShip";
import { Translation } from "~/i18n/Translation";
import { TranslationId } from "~/i18n/translations/types";
import { useTranslation } from "~/i18n/useTranslation";
import { getRoute } from "~/utils/getRoute";
import { ShipAttributes } from "~/views/Ship/components/ShipAttributes";
import { ShipPrices } from "~/views/Ship/components/ShipPrices";

export const ShipPage = () => {
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

  const { locale } = useRouter();

  const componentsTranslation = useTranslation(
    "Ships.Details.Components.title"
  );
  const crewTranslation = useTranslation("Ships.Details.Crew.title");
  const modulesTranslation = useTranslation("Ships.Details.Modules.title");

  return (
    <Container>
      <Flex pt={8}>
        <BlurBackground direction="col" className="space-y-5" p={5}>
          <Link href={getRoute("/ships")} locale={locale}>
            <ArrowLeftIcon className="h-8 w-8 text-white" />
          </Link>

          <Text
            color="text-white"
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
                <Text size="xl" color="text-gray-100">
                  <Translation
                    id={
                      `Ships.Details.${name
                        ?.toLocaleLowerCase()
                        ?.replace(/ /g, "_")}.description` as TranslationId
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
                      className="transition duration-500 ease-in-out h-full w-full bg-auto bg-no-repeat bg-center object-cover hover:scale-95"
                    />
                  </Flex>
                ))}
              </Flex>
            </Flex>
          </Flex>
        </BlurBackground>
      </Flex>
    </Container>
  );
};
