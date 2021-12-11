import { useEffect, useState } from "react";
import { Loader } from "~/components/common/Loader";
import { Text } from "~/components/common/Text";
import { StarAtlasEntity } from "~/types";
import { getEntityBestPrices } from "~/utils/getEntityBestPrices";
import { getEntityVwapPrice } from "~/utils/getEntityVwapPrice";

type Props = { ships: StarAtlasEntity[] };

type ShipTableRow = {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  bestAskPrice: number;
  bestBidPrice: number;
  priceVsVwapPrice: number;
  bestBidPriceVsVwapPrice: number;
  bestAskPriceVsVwapPrice: number;
  vwapPrice: number;
};

const useShipsTable = (ships: StarAtlasEntity[]) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ShipTableRow[]>([]);

  useEffect(() => {
    const run = async () => {
      setLoading(true);

      const result = await Promise.all(
        ships.map(async (ship) => {
          const { price, bestBidPrice, bestAskPrice } =
            await getEntityBestPrices(ship.markets);

          const vwapPrice = getEntityVwapPrice(ship.primarySales);

          return {
            id: ship._id,
            bestAskPrice,
            bestBidPrice,
            imageUrl: ship.media.thumbnailUrl,
            name: ship.name,
            price,
            vwapPrice,
            priceVsVwapPrice: (1 - price / vwapPrice) * 100,
            bestAskPriceVsVwapPrice: (1 - bestAskPrice / vwapPrice) * 100,
            bestBidPriceVsVwapPrice: (1 - bestBidPrice / vwapPrice) * 100,
          };
        })
      );
      setData(result);
      setLoading(false);
    };
    run();
  }, []);

  return { data, loading };
};

export const ShipTable = ({ ships }: Props) => {
  const { data, loading } = useShipsTable(ships);

  return (
    <div className="relative p-10 bg-black overflow-hidden backdrop-filter backdrop-blur-lg bg-opacity-20">
      <table className="table-auto text-white">
        <thead>
          <tr>
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
        <tbody>
          {loading ? (
            <tr>{loading && <Loader />}</tr>
          ) : (
            data.map((ship) => (
              <tr key={ship.id}>
                <td className="border-2 border-white">
                  <img src={ship.imageUrl} className="h-16 w-16 object-cover" />
                </td>
                <Text as="td" className="px-4 py-2 border-2 border-white">
                  {ship.name}
                </Text>
                <Text as="td" className="px-4 py-2 border-2 border-white">
                  $ {ship.price.toFixed(2)}
                </Text>
                <Text as="td" className="px-4 py-2 border-2 border-white">
                  $ {ship.bestBidPrice.toFixed(2)}
                </Text>
                <Text as="td" className="px-4 py-2 border-2 border-white">
                  $ {ship.bestAskPrice.toFixed(2)}
                </Text>

                <Text
                  as="td"
                  align="center"
                  weight="medium"
                  color={ship.priceVsVwapPrice > 0 ? "green-300" : "red-300"}
                  className="px-4 py-2 border-2 border-white"
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
                  className="px-4 py-2 border-2 border-white"
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
                  className="px-4 py-2 border-2 border-white"
                >
                  {Math.abs(ship.bestAskPriceVsVwapPrice).toFixed(2)} %
                </Text>
                <Text
                  as="td"
                  align="center"
                  className="px-4 py-2 border-2 border-white"
                >
                  $ {ship.vwapPrice.toFixed(2)}
                </Text>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
