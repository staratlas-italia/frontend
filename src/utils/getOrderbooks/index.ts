import { Connection, PublicKey } from "@solana/web3.js";
import { GmClientService, Order } from "@staratlas/factory";
import { groupBy } from "lodash";
import {
  ATLAS_TOKEN_MINT_ID,
  SA_MARKETPLACE_PROGRAM_ID,
  USDC_TOKEN_MINT_ID,
} from "~/common/constants";

export const getOrderBooks = async (
  gmClientService: GmClientService,
  connection: Connection
) => {
  const usdcOrders = await gmClientService.getOpenOrdersForCurrency(
    connection,
    new PublicKey(USDC_TOKEN_MINT_ID),
    SA_MARKETPLACE_PROGRAM_ID
  );

  const atlasOrders = await gmClientService.getOpenOrdersForCurrency(
    connection,
    new PublicKey(ATLAS_TOKEN_MINT_ID),
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
