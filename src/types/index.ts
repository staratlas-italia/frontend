import { BN } from "@project-serum/anchor";
import { ScoreVarsShipInfo, ShipStakingInfo } from "@staratlas/factory";
import { ComponentType } from "react";
import {
  AMMO_TOKEN_MINT_ID,
  FOOD_TOKEN_MINT_ID,
  FUEL_TOKEN_MINT_ID,
  TOOL_TOKEN_MINT_ID,
} from "~/common/constants";

type ShipAttributes = {
  itemType: string;
  class: string;
  tier: number;
  spec: string;
  rarity: string;
  category: string;
  make: string;
  model: string;
  unitLength: number;
  unitWidth: number;
  unitHeight: number;
};

export type Player = {
  avatarId: Avatar;
  avatarImageUrl?: string;
  badgeMint: string | null;
  balance: number;
  balances: {
    mint: ResourceMint;
    quantity: number;
    valuePerAsset: number;
  }[];
  country: string;
  currencySymbol: Currency;
  faction: number;
  factionRank: number;
  publicKey: string;
  rank: number;
  registrationDate: string;
  updatedAt: string;
};

export type NormalizedShipStakingInfo = {
  [key in keyof ShipStakingInfo]: ShipStakingInfo[key] extends infer U
    ? U extends BN
      ? number
      : string
    : never;
};
export type NormalizedScoreVarsShipInfo = {
  [key in keyof ScoreVarsShipInfo]: ScoreVarsShipInfo[key] extends infer U
    ? U extends BN
      ? number
      : U extends number
      ? number
      : string
    : never;
};

export type Currency = "ATLAS" | "POLIS" | "USDC";

export type iconRenderProp = (props: {
  className: string;
}) => ComponentType<typeof props> | JSX.Element | null;

export type AmmoMint = typeof AMMO_TOKEN_MINT_ID;
export type FoodMint = typeof FOOD_TOKEN_MINT_ID;
export type FuelMint = typeof FUEL_TOKEN_MINT_ID;
export type ToolMint = typeof TOOL_TOKEN_MINT_ID;

export type ResourceMint = AmmoMint | FoodMint | FuelMint | ToolMint;

export type ShipSlot = {
  type: string;
  size: string;
  quantity: number;
};

export type PromiseContent<PromiseLike> = PromiseLike extends Promise<infer U>
  ? U
  : never;

export const shipSizes = [
  "xx-small",
  "x-small",
  "small",
  "medium",
  "large",
  "capital",
  "commander",
  "titan",
] as const;

export type ShipSize = typeof shipSizes[number];

type ShipSlots = {
  crewSlots: ShipSlot[];
  componentSlots: ShipSlot[];
  moduleSlots: ShipSlot[];
};

type ShipMedia = {
  qrInstagram: string;
  qrFacebook: string;
  sketchfab: string;
  audio: string;
  thumbnailUrl: string;
  gallery: string[];
};

type ShipCollection = {
  family: string;
  name: string;
};

export type Market = {
  _id: string;
  id: string;
  quotePair: string;
  serumProgramId: string;
};

type Airdrop = {
  _id: string;
  id: number;
  supply: number;
};

export type Sale = {
  _id: string;
  listTimestamp: number;
  supply: number;
  price: number;
  isMinted: boolean;
  isListed: boolean;
  mintTimestamp: number;
};

export type StarAtlasEntity = {
  _id: string;
  description: string;
  image: string;
  attributes: ShipAttributes;
  slots: ShipSlots;
  symbol: string;
  media: ShipMedia;
  tradeSettings: {
    saleTime: 1630454400;
    msrp: {
      value: 20;
      currencySymbol: "USDC";
    };
  };
  deactivated: boolean;
  name: string;
  collection: ShipCollection;
  createdAt: string;
  updatedAt: string;
  mint: string;
  markets: Market[];
  primarySales: Sale[];
  airdrops: Airdrop[];
};

export type UsturAvatar = "Ustur_A" | "Ustur_B" | "Ustur_C" | "Ustur_D";
export type MudAvatar = "MUD_A" | "MUD_B" | "MUD_C" | "MUD_D";
export type OniAvatar =
  | "ONI_A"
  | "ONI_B"
  | "ONI_C"
  | "ONI_D"
  | "ONI_E"
  | "ONI_F";

export type Avatar = UsturAvatar | MudAvatar | OniAvatar;
