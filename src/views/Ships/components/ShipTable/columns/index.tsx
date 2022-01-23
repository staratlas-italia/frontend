import { ExternalLinkIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { Flex } from "~/components/layout/Flex";
import { fillUrlParameters } from "~/utils/fillUrlParameters";
import { getRoute } from "~/utils/getRoute";
import { MarketAction } from "~/views/Ships/components/ShipTable/useShipsTable";
import { buildDiscountColumn } from "~/views/Ships/components/ShipTable/utils/buildDiscountColumn";
import { buildNameColumn } from "~/views/Ships/components/ShipTable/utils/buildNameColumn";
import {
  buildAtlasPriceColumn,
  buildPriceColumn,
} from "~/views/Ships/components/ShipTable/utils/buildPriceColumn";

type Param = {
  action: MarketAction;
  locale?: string;
  formatMessage: (p: any) => string;
  atlasPrice: number;
};

export const columns = ({
  action,
  atlasPrice,
  formatMessage,
  locale,
}: Param) => [
  buildNameColumn({
    name: formatMessage({
      id: "Ships.Table.Column.name",
    }),
    accessor: "name",
    imageUrlAccessor: "imageUrl",
  }),
  buildPriceColumn({
    name: formatMessage({
      id: "Ships.Table.Column.price",
    }),
    accessor: action === "buy" ? "buyPrice" : "sellPrice",
    currency: "USDC",
  }),
  buildAtlasPriceColumn({
    name: formatMessage({
      id: "Ships.Table.Column.atlasPrice",
    }),
    accessor: action === "buy" ? "atlasBuyPrice" : "atlasSellPrice",
    atlasValue: atlasPrice,
  }),
  buildPriceColumn({
    name: formatMessage({
      id: "Ships.Table.Column.vwap",
    }),
    accessor: "vwapPrice",
    currency: "USDC",
  }),
  buildDiscountColumn({
    name: formatMessage({
      id: "Ships.Table.Column.priceVsVwapPrice",
    }),
    accessor: action === "buy" ? "buyPriceVsVwapPrice" : "sellPriceVsVwapPrice",
    suffix: " %",
  }),
  buildDiscountColumn({
    name: formatMessage({
      id: "Ships.Table.Column.atlasPriceVsVwapPrice",
    }),
    accessor:
      action === "buy"
        ? "atlasBuyPriceVsVwapPrice"
        : "atlasSellPriceVsVwapPrice",
    suffix: " %",
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
];
