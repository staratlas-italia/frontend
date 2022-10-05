import { Connection } from "@solana/web3.js";
import { GmClientService, Order } from "@staratlas/factory";
import { groupBy } from "lodash";
import {
  ATLAS_TOKEN_MINT,
  SA_MARKETPLACE_PROGRAM_ID,
  USDC_TOKEN_MINT,
} from "~/common/constants";

export const getOrderBooks = async (
  gmClientService: GmClientService,
  connection: Connection
) => {
  const usdcOrders = await gmClientService.getOpenOrdersForCurrency(
    connection,
    USDC_TOKEN_MINT,
    SA_MARKETPLACE_PROGRAM_ID
  );

  const atlasOrders = await gmClientService.getOpenOrdersForCurrency(
    connection,
    ATLAS_TOKEN_MINT,
    SA_MARKETPLACE_PROGRAM_ID
  );

  const atlasOrdersByType = groupBy(atlasOrders, "orderType") as Record<
    "buy" | "sell",
    Order[]
  >;

  const usdcOrdersByType = groupBy(usdcOrders, "orderType") as Record<
    "buy" | "sell",
    Order[]
  >;

  return {
    atlas: {
      buy: groupBy(atlasOrdersByType.buy, "orderMint"),
      sell: groupBy(atlasOrdersByType.sell, "orderMint"),
    },
    usdc: {
      buy: groupBy(usdcOrdersByType.buy, "orderMint"),
      sell: groupBy(usdcOrdersByType.sell, "orderMint"),
    },
  };
};
