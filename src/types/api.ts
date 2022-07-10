import { NormalizedShipStakingInfoExtended, Player } from "~/types";

export type Self = {
  createdAt?: Date;
  discordId: null;
  faction?: string;
  lastRefillAt?: Date;
  notifications: boolean;
  players: Player[];
  tier?: 0 | 1 | 2;
  wallets: string[];
  referral?: { code: string; createdAt: Date };
  fromReferral?: string;
};

export type ScoreFleetResponse =
  | {
      success: false;
      error: string;
    }
  | {
      success: true;
      data: NormalizedShipStakingInfoExtended[];
    };

export type Faction = null | 0 | 1 | 2;

export type ChartType =
  | "avg-ship-quantity"
  | "faction-pie"
  | "faction-tiers-pie"
  | "tiers-pie";

export type ChartEntry = { label: string; value: number };

export type BasicChartData = {
  data: ChartEntry[];
};

export type FactionTiersPieData = {
  data: {
    tiersData: ChartEntry[];
    factionTiersData: ChartEntry[];
  };
};

export type ChartResponses = {
  [C in ChartType]: C extends "faction-tiers-pie"
    ? FactionTiersPieData
    : BasicChartData;
};
