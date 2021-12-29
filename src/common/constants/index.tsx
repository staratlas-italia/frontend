import { Currency } from "~/types";

export const ATLAS_USDC_MARKET_ADDR =
  "Di66GTLsV64JgCCYGVcY21RZ173BHkjJVgPyezNN7P1K";

export const STAR_ATLAS_SERUM_PROGRAM_ID =
  "9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin";

export const ATLAS_TOKEN_ID = "9VmYq1qE2GQKxPP66sdgLDKF7CrjmpxbSYdxUfN9zjb7";
export const POLIS_TOKEN_ID = "HesNk1oVYo3L3kGYs5o1tqLWfhSMWLF8eqvztRnTHaoP";
export const USDC_TOKEN_ID = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";

export const DEXLAB_API_URL = "https://api.dexlab.space/v1";

export const USDC_TOKEN_MINT_ID =
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";

export const SA_FLEET_PROGRAM_ID =
  "FLEET1qqzpexyaDpqb2DGsSzE2sDCizewCg9WjrA6DBW";

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

export const FUEL_PRICE: number = 0.0014336;

export const FOOD_PRICE: number = 0.0006144;

export const ARMS_PRICE: number = 0.0021504;

export const TOOLKIT_PRICE: number = 0.0017408;

export const ATLAS_DECIMAL: number = 100_000_000;

export const ONE_DAY_IN_MILLISECONDS: number = 86_400_000;
