import { Connection, PublicKey } from "@solana/web3.js";
import { GmClientService, Order } from "@staratlas/factory";
import { groupBy } from "lodash";
import {
  ATLAS_TOKEN_MINT,
  SA_MARKETPLACE_PROGRAM_ID,
  USDC_TOKEN_MINT,
} from "~/common/constants";

export const getAssetOrderBook = async (
  gmClientService: GmClientService,
  connection: Connection,
  mint: PublicKey
) => {
  const assetOrders = await gmClientService.getOpenOrdersForAsset(
    connection,
    mint,
    SA_MARKETPLACE_PROGRAM_ID
  );

  const atlasOrders = assetOrders.filter(
    (order) => order.currencyMint === ATLAS_TOKEN_MINT.toString()
  );

  const usdcOrders = assetOrders.filter(
    (order) => order.currencyMint === USDC_TOKEN_MINT.toString()
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
      buy: atlasOrdersByType.buy,
      sell: atlasOrdersByType.sell,
    },
    usdc: {
      buy: usdcOrdersByType.buy,
      sell: usdcOrdersByType.sell,
    },
  };
};
