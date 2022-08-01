import { PublicKey } from "@solana/web3.js";

export const ATLAS_USDC_MARKET_ADDR =
  "Di66GTLsV64JgCCYGVcY21RZ173BHkjJVgPyezNN7P1K";

export const AMMO_TOKEN_MINT_ID = "ammoK8AkX2wnebQb35cDAZtTkvsXQbi82cGeTnUvvfK";
export const FOOD_TOKEN_MINT_ID = "foodQJAztMzX1DKpLaiounNe2BDMds5RNuPC6jsNrDG";
export const TOOL_TOKEN_MINT_ID = "tooLsNYLiVqzg8o4m3L2Uetbn62mvMWRqkog6PQeYKL";
export const FUEL_TOKEN_MINT_ID = "fueL3hBZjLLLJHiFH9cqZoozTG3XQZ53diwFPwbzNim";

export const TIER1_TOKEN_MINT_ID = new PublicKey(
  "tr1HUaLpPmvaj1PAAXJokJ7PLjEGoSfuULhRvVvAPBS"
);
export const TIER2_TOKEN_MINT_ID = new PublicKey(
  "tr2cweq4j6F8LrXk6vWWmamsxzkSFxyStCS3v1z2j75"
);
export const TIER3_TOKEN_MINT_ID = new PublicKey(
  "tr3Z8EqLMeNf2gHSpCsu9uP2o5DzoQ8QNFmueKjHQ95"
);

export const ATLAS_TOKEN_MINT = new PublicKey(
  "ATLASXmbPQxBUYbxPsV97usA3fPQYEqzQBUHgiFCUsXx"
);

export const USDC_TOKEN_MINT = new PublicKey(
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
);

export const DEVNET_USDC_TOKEN_MINT = new PublicKey(
  "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr"
);

export const SA_MARKETPLACE_PROGRAM_ID = new PublicKey(
  "traderDnaR5w6Tcoi3NFm53i48FTDNbGjBSZwWXDRrg"
);

export const POLIS_TOKEN_MINT = new PublicKey(
  "poLisWXnNRwC6oBu1vHiuKQzFjGL4XDSu4g9qjz9qVk"
);

export const SA_FLEET_PROGRAM = new PublicKey(
  "FLEET1qqzpexyaDpqb2DGsSzE2sDCizewCg9WjrA6DBW"
);

export const DEXLAB_API_URL = "https://open-api.dexlab.space/v1";

export const FUEL_PRICE = 0.0014336;

export const FOOD_PRICE = 0.0006144;

export const ARMS_PRICE = 0.0021504;

export const TOOLKIT_PRICE = 0.0017408;

export const ATLAS_DECIMAL = 100_000_000;

export const ONE_DAY_IN_MILLISECONDS = 86_400_000;

export const SAI_CITIZEN_WALLET_DESTINATION = new PublicKey(
  "7rQrcmvXPMPV2eYUbisJhiqwpJKj1KDzhvnz2DEgot14"
);

export const WEBSITE_URL =
  process.env.ENVIRONMENT === "development"
    ? ""
    : "https://app.staratlasitalia.com";

export const FLEET_WEBSITE_URL = "https://fleet.staratlasitalia.com";
