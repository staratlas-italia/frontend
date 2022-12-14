import { GrowthBook } from "@growthbook/growthbook-react";
import { PublicKey } from "@solana/web3.js";
import { GmClientService } from "@staratlas/factory";
import { TranslationId } from "~/i18n/translations/types";
import { Faction } from "~/types";

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

export const DISCORD_API_URL = "https://discord.com/api";

export const DISCORD_OAUTH_URL = process.env.DISCORD_OAUTH_URL;

export const FUEL_PRICE = 0.0014336;

export const FOOD_PRICE = 0.0006144;

export const ARMS_PRICE = 0.0021504;

export const TOOLKIT_PRICE = 0.0017408;

export const ATLAS_DECIMAL = 100_000_000;

export const ONE_DAY_IN_MILLISECONDS = 86_400_000;

export const WEBSITE_URL =
  process.env.ENVIRONMENT === "development"
    ? ""
    : "https://app.staratlasitalia.com";

export const FLEET_WEBSITE_URL = "https://fleet.staratlasitalia.com";

export const SAI_CITIZEN_WALLET_DESTINATION = new PublicKey(
  "saiQr2S4nVMfhsaJYmTMSdVwaB1PbqjYsCDX1FnDJon"
);

export const CITIZEN_TOKEN_MINT_PER_FACTION: Record<
  Lowercase<Faction>,
  PublicKey
> = {
  mud: new PublicKey("mudS4YjsuhGAgoihdhT64762iGTYaqKZN92bwhcGAGr"),
  oni: new PublicKey("oniMqPYgTypbvTJqu8mL94pQM5QDdMF2fXcyweNJePQ"),
  ustur: new PublicKey("ustuRPvoFHcmoonK7on8tc6MaUQeuzUxx2ioFeuXLyn"),
};

export const DEV_EMAIL = "dev@staratlasitalia.com";

export const growthbook = new GrowthBook();

export const gmClientService = new GmClientService();

export const FEATURES_ENDPOINT =
  process.env.ENVIRONMENT === "production"
    ? process.env.FEATURES_ENDPOINT
    : process.env.DEV_FEATURES_ENDPOINT;

export const SAI_TOKEN_SWAP_PROGRAM_ID = new PublicKey(
  "9EwZquhRwZ7efbMwATpt5XRJsbXKFjQ2aFfePyL2ngFg"
);

type SwapSetting = {
  quantity?: number;
  name: string;
  mint: PublicKey;
  swapAccount: PublicKey;
  vaultCurrency: string;
  image: {
    normal: string;
    square: string;
  };
  sections: {
    intro: {
      title: TranslationId;
      description: TranslationId;
    };
    checkout: {
      title: TranslationId;
      subtitle: TranslationId;
    };
    confirmed: {
      description: TranslationId;
    };
  };
};

export const DEVNET_FACTION_TO_TOKEN_SWAP_STATE_ACCOUNTS: Record<
  Lowercase<Faction>,
  string
> = {
  oni: "FQpDeHQZ4csh7dkyYGFPDq4mvW6KZH4uTBxohxPG3K8b",
  mud: "BtpXkPQoAc2eeoFoSmjqJxssM2GUcLScbEJQr3ACvDT9",
  ustur: "2w1DbkC4XcreYJquUz2vz2uhV9pKaik4j6w11uWjFUso",
};

export const FACTION_TO_TOKEN_SWAP_STATE_ACCOUNTS_DISCOUNTED: Record<
  Lowercase<Faction>,
  string
> = {
  oni: "D9Nq8DSbTvDWTHnG9jEgkcoLKmfTaGds6UgdE9c1Y4hz",
  mud: "BXkoZquRBwbscxLit57CQCJGa9LwE2TByQpvSp9afhFe",
  ustur: "9Pb1mbD6tkxsRPauNZPZ5fta7TUMPjN6ZXpujTjkQNko",
};

export const FACTION_TO_TOKEN_SWAP_STATE_ACCOUNTS: Record<
  Lowercase<Faction>,
  string
> = {
  oni: "J6cvRe9S7D6RtsKxLeQDYmRLdhAwCEw6jXCUCsLFEWmC",
  mud: "3CKAvF1v9hCXzZHPG68CMPtTuuX7gAE1dmvW6xBdnVNH",
  ustur: "AKPxHQyA7rzPwcfx8udQjisaWm45qopMoji8cC8tiMBJ",
};

export const DEVNET_CITIZEN_TOKEN_MINT_PER_STATE_ACCOUNT: Record<
  string,
  PublicKey
> = {
  [DEVNET_FACTION_TO_TOKEN_SWAP_STATE_ACCOUNTS.oni]: new PublicKey(
    "FCNy7oyjevsCbHbL2cgDJeWrmd3wWTDeq4u4uafCNUuu"
  ),
  [DEVNET_FACTION_TO_TOKEN_SWAP_STATE_ACCOUNTS.mud]: new PublicKey(
    "EVWyAZNy32GnB9GZEcnGsawii4NfnC6KPsaRCGM7g8sx"
  ),
  [DEVNET_FACTION_TO_TOKEN_SWAP_STATE_ACCOUNTS.ustur]: new PublicKey(
    "7n4rgd4WVNvzFom7UFqjCa9fpMB9apP8Gz3zX3aS6VEr"
  ),
};

const citizenShipTranslations: SwapSetting["sections"] = {
  intro: {
    title: "citizenship.intro.title",
    description: "citizenship.intro.description",
  },
  checkout: {
    title: "citizenship.checkout.title",
    subtitle: "citizenship.checkout.subtitle",
  },
  confirmed: {
    description: "citizenship.checkout.confirmed.subtitle",
  },
};

export const TOKEN_SWAP_STATE_ACCOUNTS: Record<string, SwapSetting> = {
  [FACTION_TO_TOKEN_SWAP_STATE_ACCOUNTS.oni]: {
    quantity: 1,
    mint: CITIZEN_TOKEN_MINT_PER_FACTION.oni,
    name: "Badge ONI",
    swapAccount: new PublicKey(FACTION_TO_TOKEN_SWAP_STATE_ACCOUNTS.oni),
    vaultCurrency: "USDC",
    image: {
      normal: "/images/cards/card-oni.webp",
      square: "/images/cards/card-square-oni.webp",
    },
    sections: citizenShipTranslations,
  },
  [FACTION_TO_TOKEN_SWAP_STATE_ACCOUNTS.mud]: {
    quantity: 1,
    mint: CITIZEN_TOKEN_MINT_PER_FACTION.mud,
    name: "Badge MUD",
    swapAccount: new PublicKey(FACTION_TO_TOKEN_SWAP_STATE_ACCOUNTS.mud),
    vaultCurrency: "USDC",
    image: {
      normal: "/images/cards/card-mud.webp",
      square: "/images/cards/card-square-mud.webp",
    },
    sections: citizenShipTranslations,
  },
  [FACTION_TO_TOKEN_SWAP_STATE_ACCOUNTS.ustur]: {
    quantity: 1,
    mint: CITIZEN_TOKEN_MINT_PER_FACTION.ustur,
    name: "Badge USTUR",
    swapAccount: new PublicKey(FACTION_TO_TOKEN_SWAP_STATE_ACCOUNTS.ustur),
    vaultCurrency: "USDC",
    image: {
      normal: "/images/cards/card-ustur.webp",
      square: "/images/cards/card-square-ustur.webp",
    },
    sections: citizenShipTranslations,
  },
  [FACTION_TO_TOKEN_SWAP_STATE_ACCOUNTS_DISCOUNTED.oni]: {
    quantity: 1,
    mint: CITIZEN_TOKEN_MINT_PER_FACTION.oni,
    name: "Badge ONI discounted",
    swapAccount: new PublicKey(
      FACTION_TO_TOKEN_SWAP_STATE_ACCOUNTS_DISCOUNTED.oni
    ),
    vaultCurrency: "USDC",
    image: {
      normal: "/images/cards/card-oni.webp",
      square: "/images/cards/card-square-oni.webp",
    },
    sections: citizenShipTranslations,
  },
  [FACTION_TO_TOKEN_SWAP_STATE_ACCOUNTS_DISCOUNTED.mud]: {
    quantity: 1,
    mint: CITIZEN_TOKEN_MINT_PER_FACTION.mud,
    name: "Badge MUD discounted",
    swapAccount: new PublicKey(
      FACTION_TO_TOKEN_SWAP_STATE_ACCOUNTS_DISCOUNTED.mud
    ),
    vaultCurrency: "USDC",
    image: {
      normal: "/images/cards/card-mud.webp",
      square: "/images/cards/card-square-mud.webp",
    },
    sections: citizenShipTranslations,
  },
  [FACTION_TO_TOKEN_SWAP_STATE_ACCOUNTS_DISCOUNTED.ustur]: {
    quantity: 1,
    mint: CITIZEN_TOKEN_MINT_PER_FACTION.ustur,
    name: "Badge USTUR discounted",
    swapAccount: new PublicKey(
      FACTION_TO_TOKEN_SWAP_STATE_ACCOUNTS_DISCOUNTED.ustur
    ),
    vaultCurrency: "USDC",
    image: {
      normal: "/images/cards/card-ustur.webp",
      square: "/images/cards/card-square-ustur.webp",
    },
    sections: citizenShipTranslations,
  },
};
