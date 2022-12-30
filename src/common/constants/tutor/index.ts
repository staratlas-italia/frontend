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
    m: "BGkzA24K1f8Sp9jxZRXT7Kdu9QMSNUw5tUiiuiro1KwS",
    l: "BGkzA24K1f8Sp9jxZRXT7Kdu9QMSNUw5tUiiuiro1KwS",
  };

export const TUTOR_TO_TOKEN_SWAP_STATE_ACCOUNTS: Record<Tutor, string> = {
  s: "26WSjG4Dz8onz2t3W1ga98sVu5CEdgYbrCkWR7sPB8Bw",
  m: "9gRJncna1A1n1ZSbLorknwUPRgbHPmpcBPAYRKHwpxQU",
  l: "C3An2AyJWR1Jk44spiQYDfsCm8ynDdyC1RU3EiZHsAQW",
};

const introTranslations: Pick<SwapSetting["sections"]["intro"], "title"> = {
  title: "tutor.intro.title",
};

export const tutorSwapTranslations: Omit<SwapSetting["sections"], "intro"> = {
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
        discounts: {
          discountRelativeToPreviousBundle: 0,
          preReleaseDiscount: 35,
        },
        quantity: 5600,
        mint: TUTOR_SWAP_TOKEN_MINT,
        name: "Badge Istitutore S",
        size: "S",
        swapAccount: new PublicKey(TUTOR_TO_TOKEN_SWAP_STATE_ACCOUNTS.s),
        vaultCurrency: "USDC",
        prices: {
          real: 370,
          full: 560,
        },
        image: {
          normal: "/images/cards/card-tutor-s.webp",
          square: "/images/cards/card-tutor-s-square.webp",
        },
        sections: {
          ...tutorSwapTranslations,
          intro: {
            ...introTranslations,
            description: "tutor.intro.description.s",
          },
        },
      },
      [TUTOR_TO_TOKEN_SWAP_STATE_ACCOUNTS.m]: {
        discounts: {
          discountRelativeToPreviousBundle: 11,
          preReleaseDiscount: 41,
        },
        quantity: 10000,
        mint: TUTOR_SWAP_TOKEN_MINT,
        name: "Badge Istitutore M",
        size: "M",
        swapAccount: new PublicKey(TUTOR_TO_TOKEN_SWAP_STATE_ACCOUNTS.m),
        vaultCurrency: "USDC",
        prices: {
          full: 1000,
          real: 590,
        },
        image: {
          normal: "/images/cards/card-tutor-m.webp",
          square: "/images/cards/card-tutor-m-square.webp",
        },
        sections: {
          ...tutorSwapTranslations,
          intro: {
            ...introTranslations,
            description: "tutor.intro.description.m",
          },
        },
      },
      [TUTOR_TO_TOKEN_SWAP_STATE_ACCOUNTS.l]: {
        discounts: {
          discountRelativeToPreviousBundle: 20,
          preReleaseDiscount: 47,
        },
        quantity: 22500,
        mint: TUTOR_SWAP_TOKEN_MINT,
        name: "Badge Istitutore L",
        size: "L",
        swapAccount: new PublicKey(TUTOR_TO_TOKEN_SWAP_STATE_ACCOUNTS.l),
        vaultCurrency: "USDC",
        prices: {
          full: 2250,
          real: 1200,
        },
        image: {
          normal: "/images/cards/card-tutor-l.webp",
          square: "/images/cards/card-tutor-l-square.webp",
        },
        sections: {
          ...tutorSwapTranslations,
          intro: {
            ...introTranslations,
            description: "tutor.intro.description.l",
          },
        },
      },
    },
  },
  devnet: {
    normal: {
      [DEVNET_TUTOR_TO_TOKEN_SWAP_STATE_ACCOUNTS.s]: {
        quantity: 10,
        mint: DEVNET_SWAP_TOKEN_MINT_PER_TUTOR.s,
        name: "Badge Istitutore S - Devnet",
        swapAccount: new PublicKey(DEVNET_TUTOR_TO_TOKEN_SWAP_STATE_ACCOUNTS.s),
        vaultCurrency: "USDC-Dev",
        image: {
          normal: "/images/cards/card-tutor-s.webp",
          square: "/images/cards/card-tutor-s-square.webp",
        },
        sections: {
          ...tutorSwapTranslations,
          intro: {
            ...introTranslations,
            description: "tutor.intro.description.s",
          },
        },
      },
      [DEVNET_TUTOR_TO_TOKEN_SWAP_STATE_ACCOUNTS.m]: {
        quantity: 10,
        mint: DEVNET_SWAP_TOKEN_MINT_PER_TUTOR.s,
        name: "Badge Istitutore S - Devnet",
        swapAccount: new PublicKey(DEVNET_TUTOR_TO_TOKEN_SWAP_STATE_ACCOUNTS.s),
        vaultCurrency: "USDC-Dev",
        image: {
          normal: "/images/cards/card-tutor-s.webp",
          square: "/images/cards/card-tutor-s-square.webp",
        },
        sections: {
          ...tutorSwapTranslations,
          intro: {
            ...introTranslations,
            description: "tutor.intro.description.s",
          },
        },
      },
      [DEVNET_TUTOR_TO_TOKEN_SWAP_STATE_ACCOUNTS.l]: {
        quantity: 10,
        mint: DEVNET_SWAP_TOKEN_MINT_PER_TUTOR.s,
        name: "Badge Istitutore S - Devnet",
        swapAccount: new PublicKey(DEVNET_TUTOR_TO_TOKEN_SWAP_STATE_ACCOUNTS.s),
        vaultCurrency: "USDC-Dev",
        image: {
          normal: "/images/cards/card-tutor-s.webp",
          square: "/images/cards/card-tutor-s-square.webp",
        },
        sections: {
          ...tutorSwapTranslations,
          intro: {
            ...introTranslations,
            description: "tutor.intro.description.s",
          },
        },
      },
    },
  },
};

export const clusterSwitch = <T>(cluster: Cluster, devnet: T, mainnet: T) => {
  return cluster === "devnet" ? devnet : mainnet;
};

export const isTutorSwap = (state: string) =>
  Object.values({
    ...DEVNET_TUTOR_TO_TOKEN_SWAP_STATE_ACCOUNTS,
    ...TUTOR_TO_TOKEN_SWAP_STATE_ACCOUNTS,
  }).includes(state);
