import { ExternalLinkIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { Price } from "~/components/common/Price";
import { Text } from "~/components/common/Text";
import { ButtonGroup } from "~/components/controls/ButtonGroup";
import { Flex } from "~/components/layout/Flex";
import { useShipsTable } from "~/components/pages/Ships/components/ShipTable/useShipsTable";
import { buildDiscountColumn } from "~/components/pages/Ships/components/ShipTable/utils/buildDiscountColumn";
import { buildNameColumn } from "~/components/pages/Ships/components/ShipTable/utils/buildNameColumn";
import {
  buildAtlasPriceColumn,
  buildPriceColumn,
} from "~/components/pages/Ships/components/ShipTable/utils/buildPriceColumn";
import { Table } from "~/components/Table";
import { ShipSize, shipSizes } from "~/types";
import { fillUrlParameters } from "~/utils/fillUrlParameters";
import { getRoute } from "~/utils/getRoute";

export const ShipTable = () => {
  const [size, setSize] = useState<ShipSize>("medium");

  const [fetch, { data, atlasPrice, loading }] = useShipsTable(size);

  const fetchData = useCallback(() => {
    fetch();
  }, [fetch]);

  const cols = useMemo(
    () => [
      buildNameColumn({
        name: "Name",
        accessor: "name",
        imageUrlAccessor: "imageUrl",
      }),
      buildPriceColumn({
        name: "USDC Price",
        accessor: "price",
        currency: "USDC",
      }),
      buildAtlasPriceColumn({
        name: "Atlas Price",
        accessor: "atlasPrice",
        atlasValue: atlasPrice,
      }),
      // buildPriceColumn({
      //   name: "Best Ask Price",
      //   accessor: "bestAskPrice",
      //   currency,
      // }),
      // buildPriceColumn({
      //   name: "Best Bid Price",
      //   accessor: "bestBidPrice",
      //   currency,
      // }),
      buildDiscountColumn({
        name: "Atlas Price Vs Price",
        accessor: "atlasPriceVsPrice",
        suffix: " %",
      }),
      buildDiscountColumn({
        name: "Price Vs VWAP",
        accessor: "priceVsVwapPrice",
        suffix: " %",
      }),
      buildDiscountColumn({
        name: "Atlas Price Vs VWAP",
        accessor: "atlasPriceVsVwapPrice",
        suffix: " %",
      }),
      // buildDiscountColumn({
      //   name: "Bid Price vs VWAP",
      //   accessor: "bestBidPriceVsVwapPrice",
      //   suffix: " %",
      // }),
      // buildDiscountColumn({
      //   name: "Ask Price vs VWAP",
      //   accessor: "bestAskPriceVsVwapPrice",
      //   suffix: " %",
      // }),
      buildPriceColumn({
        name: "VWAP",
        accessor: "vwapPrice",
        currency: "USDC",
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
                <a target="_blank">
                  <ExternalLinkIcon className="h-5 w-5" />
                </a>
              </Link>
            </Flex>
          );
        },
      },
    ],
    [atlasPrice]
  );

  // const notInSaleShipsCols = useMemo(
  //   () => [
  //     buildNameColumn({
  //       name: "Name",
  //       accessor: "name",
  //       imageUrlAccessor: "image",
  //     }),
  //   ],
  //   []
  // );

  return (
    <div className="relative p-5 md:p-8 bg-black overflow-hidden backdrop-filter backdrop-blur-lg bg-opacity-20">
      <Flex
        className="overflow-scroll space-y-5"
        direction="col"
        justify="center"
      >
        {!!atlasPrice && (
          <Flex className="space-x-2">
            <Price color="white" currency="ATLAS" decimals={3} value={1} />
            <Text color="white">=</Text>
            <Price color="white" decimals={3} value={atlasPrice} />
          </Flex>
        )}
        <ButtonGroup
          items={shipSizes.map((size) => [size, size])}
          onAction={(size) => setSize(size as ShipSize)}
          selectedItem={size}
        />
        <Table
          columns={cols}
          data={data}
          fetchData={fetchData}
          loading={loading}
        />

        {/* <Table
          columns={notInSaleShipsCols}
          data={notAvailableShips}
          loading={loading}
        /> */}
      </Flex>
    </div>
  );
};
