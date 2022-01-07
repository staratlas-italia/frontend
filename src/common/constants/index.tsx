import { Currency } from "~/types";

export const ATLAS_USDC_MARKET_ADDR =
  "Di66GTLsV64JgCCYGVcY21RZ173BHkjJVgPyezNN7P1K";

export const STAR_ATLAS_SERUM_PROGRAM_ID =
  "9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin";

export const DEXLAB_API_URL = "https://api.dexlab.space/v1";

export const USDC_TOKEN_MINT_ID =
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";

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
