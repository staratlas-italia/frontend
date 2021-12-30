import { ExternalLinkIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";
import { useIntl } from "react-intl";
import { ButtonGroup } from "~/components/controls/ButtonGroup";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Flex } from "~/components/layout/Flex";
import { Table } from "~/components/Table";
import { ShipSize, shipSizes } from "~/types";
import { fillUrlParameters } from "~/utils/fillUrlParameters";
import { getRoute } from "~/utils/getRoute";
import { useShipsTable } from "~/views/Ships/components/ShipTable/useShipsTable";
import { buildDiscountColumn } from "~/views/Ships/components/ShipTable/utils/buildDiscountColumn";
import { buildNameColumn } from "~/views/Ships/components/ShipTable/utils/buildNameColumn";
import {
  buildAtlasPriceColumn,
  buildPriceColumn,
} from "~/views/Ships/components/ShipTable/utils/buildPriceColumn";

export const ShipTable = () => {
  const [size, setSize] = useState<ShipSize>("medium");

  const [fetch, { data, atlasPrice, loading }] = useShipsTable(size);

  const intl = useIntl();

  const { locale } = useRouter();

  const fetchData = useCallback(() => {
    fetch();
  }, [fetch]);

  const cols = useMemo(
    () => [
      buildNameColumn({
        name: intl.formatMessage({
          id: "Ships.Table.Column.name",
          defaultMessage: "Nome",
        }),
        accessor: "name",
        imageUrlAccessor: "imageUrl",
      }),
      buildPriceColumn({
        name: intl.formatMessage({
          id: "Ships.Table.Column.price",
          defaultMessage: "Prezzo USDC",
        }),
        accessor: "price",
        currency: "USDC",
      }),
      buildAtlasPriceColumn({
        name: intl.formatMessage({
          id: "Ships.Table.Column.atlasPrice",
          defaultMessage: "Prezzo Atlas",
        }),
        accessor: "atlasPrice",
        atlasValue: atlasPrice,
      }),
      buildDiscountColumn({
        name: intl.formatMessage({
          id: "Ships.Table.Column.atlasPriceVsPrice",
          defaultMessage: "Prezzo Atlas vs Prezzo",
        }),
        accessor: "atlasPriceVsPrice",
        suffix: " %",
      }),
      buildDiscountColumn({
        name: intl.formatMessage({
          id: "Ships.Table.Column.priceVsVwapPrice",
          defaultMessage: "Prezzo vs VWAP",
        }),
        accessor: "priceVsVwapPrice",
        suffix: " %",
      }),
      buildDiscountColumn({
        name: intl.formatMessage({
          id: "Ships.Table.Column.atlasPriceVsVwapPrice",
          defaultMessage: "Prezzo Atlas vs VWAP",
        }),
        accessor: "atlasPriceVsVwapPrice",
        suffix: " %",
      }),
      buildPriceColumn({
        name: intl.formatMessage({
          id: "Ships.Table.Column.vwap",
          defaultMessage: "VWAP",
        }),
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
                locale={locale}
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
    [atlasPrice, intl]
  );

  return (
    <BlurBackground className="relative overflow-hidden" p={5} mdP={8}>
      <Flex
        className="overflow-scroll space-y-5"
        direction="col"
        justify="center"
      >
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
      </Flex>
    </BlurBackground>
  );
};
