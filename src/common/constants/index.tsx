import { Currency } from "~/types";

export const ATLAS_USDC_MARKET_ADDR =
  "Di66GTLsV64JgCCYGVcY21RZ173BHkjJVgPyezNN7P1K";

export const DEXLAB_API_URL = "https://api.dexlab.space/v1";

export const availableCurrencies: { id: Currency; name: string }[] = [
  {
    id: "USDC",
    name: "USDC",
  },
  {
    id: "ATLAS",
    name: "ATLAS",
  },
];
