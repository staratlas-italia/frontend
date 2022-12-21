import { Cluster, PublicKey } from "@solana/web3.js";
import { Faction, SwapSetting } from "~/types";

export const CITIZEN_TOKEN_MINT_PER_FACTION: Record<
  Lowercase<Faction>,
  PublicKey
> = {
  oni: new PublicKey("oniMqPYgTypbvTJqu8mL94pQM5QDdMF2fXcyweNJePQ"),
  mud: new PublicKey("mudS4YjsuhGAgoihdhT64762iGTYaqKZN92bwhcGAGr"),
  ustur: new PublicKey("ustuRPvoFHcmoonK7on8tc6MaUQeuzUxx2ioFeuXLyn"),
};

export const DEVNET_CITIZEN_TOKEN_MINT_PER_FACTION: Record<
  Lowercase<Faction>,
  PublicKey
> = {
  oni: new PublicKey("FCNy7oyjevsCbHbL2cgDJeWrmd3wWTDeq4u4uafCNUuu"),
  mud: new PublicKey("EVWyAZNy32GnB9GZEcnGsawii4NfnC6KPsaRCGM7g8sx"),
  ustur: new PublicKey("7n4rgd4WVNvzFom7UFqjCa9fpMB9apP8Gz3zX3aS6VEr"),
};

export const DEVNET_FACTION_TO_TOKEN_SWAP_STATE_ACCOUNTS: Record<
  Lowercase<Faction>,
  string
> = {
  oni: "BtpXkPQoAc2eeoFoSmjqJxssM2GUcLScbEJQr3ACvDT9",
  mud: "FQpDeHQZ4csh7dkyYGFPDq4mvW6KZH4uTBxohxPG3K8b",
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

type CitizenShipAccounts = {
  discounted: Record<string, SwapSetting>;
  normal: Record<string, SwapSetting>;
};

type ClusterCitizenShipAccounts = Record<
  Exclude<Cluster, "testnet">,
  CitizenShipAccounts
>;

export const citizenshipSwapTranslations: SwapSetting["sections"] = {
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

export const citizenShipAccounts: ClusterCitizenShipAccounts = {
  "mainnet-beta": {
    normal: {
      [FACTION_TO_TOKEN_SWAP_STATE_ACCOUNTS.oni]: {
        discounted: true,
        quantity: 1,
        mint: CITIZEN_TOKEN_MINT_PER_FACTION.oni,
        name: "Badge ONI",
        swapAccount: new PublicKey(FACTION_TO_TOKEN_SWAP_STATE_ACCOUNTS.oni),
        vaultCurrency: "USDC",
        image: {
          normal: "/images/cards/card-oni.webp",
          square: "/images/cards/card-square-oni.webp",
        },
        sections: citizenshipSwapTranslations,
      },
      [FACTION_TO_TOKEN_SWAP_STATE_ACCOUNTS.mud]: {
        discounted: true,
        quantity: 1,
        mint: CITIZEN_TOKEN_MINT_PER_FACTION.mud,
        name: "Badge MUD",
        swapAccount: new PublicKey(FACTION_TO_TOKEN_SWAP_STATE_ACCOUNTS.mud),
        vaultCurrency: "USDC",
        image: {
          normal: "/images/cards/card-mud.webp",
          square: "/images/cards/card-square-mud.webp",
        },
        sections: citizenshipSwapTranslations,
      },
      [FACTION_TO_TOKEN_SWAP_STATE_ACCOUNTS.ustur]: {
        discounted: true,
        quantity: 1,
        mint: CITIZEN_TOKEN_MINT_PER_FACTION.ustur,
        name: "Badge USTUR",
        swapAccount: new PublicKey(FACTION_TO_TOKEN_SWAP_STATE_ACCOUNTS.ustur),
        vaultCurrency: "USDC",
        image: {
          normal: "/images/cards/card-ustur.webp",
          square: "/images/cards/card-square-ustur.webp",
        },
        sections: citizenshipSwapTranslations,
      },
    },
    discounted: {
      [FACTION_TO_TOKEN_SWAP_STATE_ACCOUNTS_DISCOUNTED.oni]: {
        discounted: true,
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
        sections: citizenshipSwapTranslations,
      },
      [FACTION_TO_TOKEN_SWAP_STATE_ACCOUNTS_DISCOUNTED.mud]: {
        discounted: true,
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
        sections: citizenshipSwapTranslations,
      },
      [FACTION_TO_TOKEN_SWAP_STATE_ACCOUNTS_DISCOUNTED.ustur]: {
        discounted: true,
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
        sections: citizenshipSwapTranslations,
      },
    },
  },
  devnet: {
    normal: {
      [DEVNET_FACTION_TO_TOKEN_SWAP_STATE_ACCOUNTS.oni]: {
        quantity: 1,
        mint: DEVNET_CITIZEN_TOKEN_MINT_PER_FACTION.oni,
        name: "Badge ONI DEVNET",
        swapAccount: new PublicKey(
          DEVNET_FACTION_TO_TOKEN_SWAP_STATE_ACCOUNTS.oni
        ),
        vaultCurrency: "USDC-Dev",
        image: {
          normal: "/images/cards/card-oni.webp",
          square: "/images/cards/card-square-oni.webp",
        },
        sections: citizenshipSwapTranslations,
      },
      [DEVNET_FACTION_TO_TOKEN_SWAP_STATE_ACCOUNTS.mud]: {
        quantity: 1,
        mint: DEVNET_CITIZEN_TOKEN_MINT_PER_FACTION.mud,
        name: "Badge MUD DEVNET",
        swapAccount: new PublicKey(
          DEVNET_FACTION_TO_TOKEN_SWAP_STATE_ACCOUNTS.mud
        ),
        vaultCurrency: "USDC-Dev",
        image: {
          normal: "/images/cards/card-mud.webp",
          square: "/images/cards/card-square-mud.webp",
        },
        sections: citizenshipSwapTranslations,
      },
      [DEVNET_FACTION_TO_TOKEN_SWAP_STATE_ACCOUNTS.ustur]: {
        quantity: 1,
        mint: DEVNET_CITIZEN_TOKEN_MINT_PER_FACTION.ustur,
        name: "Badge USTUR DEVNET",
        swapAccount: new PublicKey(
          DEVNET_FACTION_TO_TOKEN_SWAP_STATE_ACCOUNTS.ustur
        ),
        vaultCurrency: "USDC-Dev",
        image: {
          normal: "/images/cards/card-ustur.webp",
          square: "/images/cards/card-square-ustur.webp",
        },
        sections: citizenshipSwapTranslations,
      },
    },
    discounted: {},
  },
};

export const isCitizenshipSwap = (state: string) =>
  Object.values({
    ...DEVNET_FACTION_TO_TOKEN_SWAP_STATE_ACCOUNTS,
    ...FACTION_TO_TOKEN_SWAP_STATE_ACCOUNTS_DISCOUNTED,
    ...FACTION_TO_TOKEN_SWAP_STATE_ACCOUNTS,
  }).includes(state);
