import { useRouter } from "next/router";
import { Loader } from "~/components/common/Loader";
import { Text } from "~/components/common/Text";
import { Flex } from "~/components/layout/Flex";
import { Menu } from "~/components/Menu";
import { useShipsTable } from "~/components/pages/Ships/components/ShipTable/useShipsTable";
import { StarAtlasEntity } from "~/types";

type Props = { ships: StarAtlasEntity[] };

const availableCurrencies = [
  {
    id: "USDC",
    name: "USDC",
  },
  {
    id: "ATLAS",
    name: "ATLAS",
  },
];

export const ShipTable = ({ ships }: Props) => {
  const {
    query: { currency },
  } = useRouter();

  const { data, loading } = useShipsTable(ships, currency as any, [currency]);

  return (
    <div className="relative p-10 bg-black overflow-hidden backdrop-filter backdrop-blur-lg bg-opacity-20">
      <Flex
        direction="col"
        justify="center"
        className="overflow-scroll space-y-5"
      >
        <Menu id="currency" items={availableCurrencies} />
        <table className="table-auto text-white">
          <thead>
            <tr className="border-b-2 border-white">
              <Text as="th" className="px-4 py-2">
                #
              </Text>
              <Text as="th" className="px-4 py-2">
                Name
              </Text>
              <Text as="th" className="px-4 py-2">
                Price
              </Text>
              <Text as="th" className="px-4 py-2">
                Best Ask Price
              </Text>
              <Text as="th" className="px-4 py-2">
                Best Bid Price
              </Text>
              <Text as="th" className="px-4 py-2">
                Price Vs VWAP
              </Text>
              <Text as="th" className="px-4 py-2">
                Bid Price vs VWAP
              </Text>
              <Text as="th" className="px-4 py-2">
                Ask Price vs VWAP
              </Text>
              <Text as="th" className="px-4 py-2">
                VWAP
              </Text>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-white">
            {loading ? (
              <tr>
                <td colSpan={9}>
                  <Flex justify="center" py={5}>
                    <Loader />
                  </Flex>
                </td>
              </tr>
            ) : (
              data.map((ship) => (
                <tr key={ship.id}>
                  <Text as="td" className="py-2">
                    <img
                      src={ship.imageUrl}
                      className="h-16 w-16 object-cover"
                    />
                  </Text>
                  <Text as="td" className="px-4 py-2">
                    {ship.name}
                  </Text>
                  <Text as="td" className="px-4 py-2">
                    {currency === "ATLAS" ? currency : "$"}{" "}
                    {ship.price.toFixed(2)}
                  </Text>
                  <Text as="td" className="px-4 py-2">
                    {currency === "ATLAS" ? currency : "$"}{" "}
                    {ship.bestBidPrice.toFixed(2)}
                  </Text>
                  <Text as="td" className="px-4 py-2">
                    {currency === "ATLAS" ? currency : "$"}{" "}
                    {ship.bestAskPrice.toFixed(2)}
                  </Text>

                  <Text
                    as="td"
                    align="center"
                    weight="medium"
                    color={ship.priceVsVwapPrice > 0 ? "green-300" : "red-300"}
                    className="px-4 py-2"
                  >
                    {Math.abs(ship.priceVsVwapPrice).toFixed(2)} %
                  </Text>
                  <Text
                    as="td"
                    align="center"
                    weight="medium"
                    color={
                      ship.bestBidPriceVsVwapPrice > 0 ? "green-300" : "red-300"
                    }
                    className="px-4 py-2"
                  >
                    {Math.abs(ship.bestBidPriceVsVwapPrice).toFixed(2)} %
                  </Text>
                  <Text
                    as="td"
                    align="center"
                    weight="medium"
                    color={
                      ship.bestAskPriceVsVwapPrice > 0 ? "green-300" : "red-300"
                    }
                    className="px-4 py-2"
                  >
                    {Math.abs(ship.bestAskPriceVsVwapPrice).toFixed(2)} %
                  </Text>
                  <Text as="td" align="center" className="px-4 py-2">
                    {currency === "ATLAS" ? currency : "$"}{" "}
                    {ship.vwapPrice.toFixed(2)}
                  </Text>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Flex>
    </div>
  );
};
