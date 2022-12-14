import { ExternalLinkIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { Flex } from "~/components/layout/Flex";
import { fillUrlParameters } from "~/utils/fillUrlParameters";
import { getRoute } from "~/utils/getRoute";
import { MarketAction } from "..";
import { buildDiscountColumn } from "../utils/buildDiscountColumn";
import { buildNameColumn } from "../utils/buildNameColumn";
import {
  buildAtlasPriceColumn,
  buildPriceColumn,
} from "../utils/buildPriceColumn";

type Param = {
  action: MarketAction;
  locale?: string;
  formatMessage: (p: any) => string;
  atlasPrice: number;
};

export const columns = ({
  action,
  locale,
  formatMessage,
  atlasPrice,
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
            target="_blank"
          >
            <ExternalLinkIcon className="h-5 w-5" />
          </Link>
        </Flex>
      );
    },
  },
];
