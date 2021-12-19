import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { availableCurrencies } from "~/common/constants";
import { Flex } from "~/components/layout/Flex";
import { Menu } from "~/components/Menu";
import { useShipsTable } from "~/components/pages/Ships/components/ShipTable/useShipsTable";
import { buildDiscountColumn } from "~/components/pages/Ships/components/ShipTable/utils/buildDiscountColumn";
import { buildImageColumn } from "~/components/pages/Ships/components/ShipTable/utils/buildImageColumn";
import { buildPriceColumn } from "~/components/pages/Ships/components/ShipTable/utils/buildPriceColumn";
import { Table } from "~/components/Table";
import { useShips } from "~/contexts/ShipsContext";
import { Currency } from "~/types";
import { fillUrlParameters } from "~/utils/fillUrlParameters";
import { getRoute } from "~/utils/getRoute";

export const ShipTable = () => {
  const {
    query: { currency: c },
  } = useRouter();

  const { ships } = useShips();

  const currency = c as Currency;

  const [fetch, { data, loading }] = useShipsTable(ships, currency as any);

  const fetchData = useCallback(() => {
    fetch();
  }, [fetch, currency]);

  const cols = useMemo(
    () => [
      buildImageColumn({ name: "#", accessor: "imageUrl", sortDisabled: true }),
      { Header: "Name", accessor: "name" },
      buildPriceColumn({
        name: "Price",
        accessor: "price",
        currency,
      }),
      buildPriceColumn({
        name: "Best Ask Price",
        accessor: "bestAskPrice",
        currency,
      }),
      buildPriceColumn({
        name: "Best Bid Price",
        accessor: "bestBidPrice",
        currency,
      }),
      buildDiscountColumn({
        name: "Price Vs VWAP",
        accessor: "priceVsVwapPrice",
        suffix: " %",
      }),
      buildDiscountColumn({
        name: "Bid Price vs VWAP",
        accessor: "bestBidPriceVsVwapPrice",
        suffix: " %",
      }),
      buildDiscountColumn({
        name: "Ask Price vs VWAP",
        accessor: "bestAskPriceVsVwapPrice",
        suffix: " %",
      }),
      buildPriceColumn({
        name: "VWAP",
        accessor: "vwapPrice",
        currency,
      }),
      {
        Header: "",
        id: "actions",
        sortDisabled: true,
        Cell: ({ row }) => {
          return (
            <Flex px={3}>
              <Link
                href={fillUrlParameters(getRoute("/ships/:shipId"), {
                  shipId: row.original.id,
                })}
              >
                <a>Read more</a>
              </Link>
            </Flex>
          );
        },
      },
    ],
    [currency]
  );

  return (
    <div className="relative p-10 bg-black overflow-hidden backdrop-filter backdrop-blur-lg bg-opacity-20">
      <Flex
        className="overflow-scroll space-y-5"
        direction="col"
        justify="center"
      >
        <Menu id="currency" items={availableCurrencies} />
        <Table
          columns={cols}
          data={data}
          fetchData={fetchData}
          loading={loading}
        />
      </Flex>
    </div>
  );
};
