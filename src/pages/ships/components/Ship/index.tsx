import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormattedMessage, useIntl } from "react-intl";
import { Button } from "~/components/controls/Button";
import { Flex } from "~/components/layout/Flex";
import { MaxWidth } from "~/components/layout/MaxWidth";
import { ColorName } from "~/components/layout/Pane";
import { StarAtlasEntity } from "~/types";
import { isFirefox } from "~/utils/isFirefox";
import { Description } from "./components/Description";
import { Heading } from "./components/Heading";
import { Image } from "./components/Image";
import { Polygon } from "./components/Polygon";

type Props = { ship: StarAtlasEntity };

const shipColors: { [key: string]: ColorName } = {
  "xx-small": "white",
  "x-small": "indigo-300",
  small: "yellow-500",
  medium: "green-500",
  large: "pink-600",
  capital: "purple-400",
  commander: "red-600",
};

export const ShipCard = ({ ship }: Props) => {
  const intl = useIntl();
  const { locale } = useRouter();

  const isF = isFirefox();

  const url = ship.markets.length
    ? `https://play.staratlas.com/market/${ship?.markets[0].id}`
    : null;

  return (
    <div
      className={classNames("rounded-3xl relative  overflow-hidden ", {
        "backdrop-filter backdrop-blur-lg bg-opacity-10 bg-black": !isF,
        "bg-gray-800": isF,
      })}
    >
      <Image src={ship?.image} alt={ship?.name} />
      <MaxWidth className="mx-auto" size="7xl">
        <div className="2xl:float-right relative pb-8 sm:pb-16 md:pb-20 lg:max-w-lg xl:max-w-2xl lg:w-full">
          <Polygon />

          <main className="relative z-10 pt-5 mx-auto w-full px-4 sm:pt-12 sm:px-6 md:pt-16 lg:px-8">
            <div className="xl:pl-40 sm:text-center lg:text-left">
              <Heading
                color={shipColors[ship?.attributes?.class?.toLowerCase()]}
                title={ship?.name}
                subtitle={ship?.attributes?.class}
              />
              <div className="mt-3 sm:mt-5 sm:max-w-xl sm:mx-auto md:mt-5 lg:mx-0">
                <Description
                  text={intl.formatMessage({
                    id: `Ships.Details.${ship.name
                      ?.toLocaleLowerCase()
                      .replace(/ /g, "_")}.description`,
                    defaultMessage: ship?.description,
                  })}
                />
              </div>
              <Flex
                direction="col"
                lgDirection="row"
                justify="center"
                lgJustify="start"
                className="mt-5 sm:mt-10"
              >
                {url && (
                  <a href={url} target="_blank">
                    <Button
                      as="span"
                      bgColor="indigo-600"
                      hoverBgColor="indigo-700"
                      className="w-full lg:w-auto"
                      textColor="white"
                    >
                      <FormattedMessage
                        id={"Ships.List.Card.BuyAction.title"}
                        defaultMessage={"Compra"}
                      />
                    </Button>
                  </a>
                )}
                <Flex className="mt-3 lg:ml-3 lg:mt-0 w-full">
                  <Link
                    href={{
                      pathname: "/ships/[id]",
                      query: { id: ship?._id },
                    }}
                    locale={locale}
                  >
                    <a className="w-full lg:w-auto">
                      <Button
                        as="span"
                        bgColor="indigo-100"
                        hoverBgColor="indigo-200"
                        className="w-full lg:w-auto"
                        textColor="indigo-700"
                      >
                        <FormattedMessage
                          id={"Ships.List.Card.ReadMore.title"}
                          defaultMessage={"Scopri di più"}
                        />
                      </Button>
                    </a>
                  </Link>
                </Flex>
              </Flex>
            </div>
          </main>
        </div>
      </MaxWidth>
    </div>
  );
};
