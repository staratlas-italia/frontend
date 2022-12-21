import { Cluster, PublicKey } from "@solana/web3.js";
import { SwapSetting } from "~/types";

type Tutor = "s" | "m" | "l";

export const TUTOR_SWAP_TOKEN_MINT = new PublicKey(
  "saigxN5oNN2VPdMfoUqzVhHtKwBfXJZGa95Uc7dtqDZ"
);

export const DEVNET_SWAP_TOKEN_MINT_PER_TUTOR: Record<Tutor, PublicKey> = {
  s: new PublicKey("AKJyRrft4RWB9o9Rd1KdWmCwKapZQ8XvNMfyPtqL45u5"),
  m: new PublicKey("AKJyRrft4RWB9o9Rd1KdWmCwKapZQ8XvNMfyPtqL45u5"),
  l: new PublicKey("AKJyRrft4RWB9o9Rd1KdWmCwKapZQ8XvNMfyPtqL45u5"),
};

export const DEVNET_TUTOR_TO_TOKEN_SWAP_STATE_ACCOUNTS: Record<Tutor, string> =
  {
    s: "BGkzA24K1f8Sp9jxZRXT7Kdu9QMSNUw5tUiiuiro1KwS",
    m: "",
    l: "",
  };

export const TUTOR_TO_TOKEN_SWAP_STATE_ACCOUNTS: Record<Tutor, string> = {
  s: "26WSjG4Dz8onz2t3W1ga98sVu5CEdgYbrCkWR7sPB8Bw",
  m: "9gRJncna1A1n1ZSbLorknwUPRgbHPmpcBPAYRKHwpxQU",
  l: "C3An2AyJWR1Jk44spiQYDfsCm8ynDdyC1RU3EiZHsAQW",
};

export const tutorSwapTranslations: SwapSetting["sections"] = {
  intro: {
    title: "tutor.intro.title",
    description: "citizenship.intro.description",
  },
  checkout: {
    title: "tutor.checkout.title",
    subtitle: "tutor.checkout.subtitle",
  },
  confirmed: {
    description: "tutor.checkout.confirmed.subtitle",
  },
};

type TutorAccounts = {
  normal: Record<string, SwapSetting>;
};

type ClusterTutorAccounts = Record<Exclude<Cluster, "testnet">, TutorAccounts>;

export const tutorAccounts: ClusterTutorAccounts = {
  "mainnet-beta": {
    normal: {
      [TUTOR_TO_TOKEN_SWAP_STATE_ACCOUNTS.s]: {
        quantity: 5600,
        mint: TUTOR_SWAP_TOKEN_MINT,
        name: "Tutor Bundle S",
        swapAccount: new PublicKey(TUTOR_TO_TOKEN_SWAP_STATE_ACCOUNTS.s),
        vaultCurrency: "USDC",
        image: {
          normal: "/images/cards/card-tutor-s.webp",
          square: "/images/cards/card-tutor-s-square.webp",
        },
        sections: tutorSwapTranslations,
      },
      [TUTOR_TO_TOKEN_SWAP_STATE_ACCOUNTS.m]: {
        quantity: 10000,
        mint: TUTOR_SWAP_TOKEN_MINT,
        name: "Tutor Bundle M",
        swapAccount: new PublicKey(TUTOR_TO_TOKEN_SWAP_STATE_ACCOUNTS.m),
        vaultCurrency: "USDC",
        image: {
          normal: "/images/cards/card-tutor-m.webp",
          square: "/images/cards/card-tutor-m-square.webp",
        },
        sections: tutorSwapTranslations,
      },
      [TUTOR_TO_TOKEN_SWAP_STATE_ACCOUNTS.l]: {
        quantity: 22500,
        mint: TUTOR_SWAP_TOKEN_MINT,
        name: "Tutor Bundle L",
        swapAccount: new PublicKey(TUTOR_TO_TOKEN_SWAP_STATE_ACCOUNTS.l),
        vaultCurrency: "USDC",
        image: {
          normal: "/images/cards/card-tutor-l.webp",
          square: "/images/cards/card-tutor-l-square.webp",
        },
        sections: tutorSwapTranslations,
      },
    },
  },
  devnet: {
    normal: {
      [DEVNET_TUTOR_TO_TOKEN_SWAP_STATE_ACCOUNTS.s]: {
        quantity: 5600,
        mint: DEVNET_SWAP_TOKEN_MINT_PER_TUTOR.s,
        name: "Tutor Bundle S - Devnet",
        swapAccount: new PublicKey(DEVNET_TUTOR_TO_TOKEN_SWAP_STATE_ACCOUNTS.s),
        vaultCurrency: "USDC-Dev",
        image: {
          normal: "/images/cards/card-tutor-s.webp",
          square: "/images/cards/card-tutor-s-square.webp",
        },
        sections: tutorSwapTranslations,
      },
    },
  },
};

export const clusterSwitch = <T>(cluster: Cluster, devnet: T, mainnet: T) => {
  return cluster === "devnet" ? devnet : mainnet;
};
