import { ObjectId, WithId } from "mongodb";
import { FactionWithNone, NormalizedShipStakingInfoExtended } from "~/types";

export type Self = WithId<{
  createdAt?: Date;
  updatedAt?: Date;
  discordId: null;
  faction?: FactionWithNone;
  lastRefillAt?: Date;
  notifications: boolean;
  players: ({
    country: string | null;
    faction: FactionWithNone;
    publicKey: string;
    registrationDate: Date;
  } | null)[];
  tier?: 0 | 1 | 2;
  wallets: string[];
  referral?: { code: string; createdAt: Date };
  fromReferral?: string;
}>;

export type PaymentReferenceResponse =
  | {
      success: false;
      error: string;
    }
  | { success: true; reference: string };

export type TransactionStatus =
  | "ACCEPTED"
  | "ACCEPTED_WITHOUT_RETURN"
  | "PENDING"
  | "REJECTED";

export type Transaction<Meta = Record<string, string | number>> = {
  meta: Meta;
  createdAt: Date;
  userId: ObjectId;
  reference: string;
  status: TransactionStatus;
};

export type ConfirmPaymentResponse =
  | {
      success: true;
      verified: boolean;
    }
  | {
      success: false;
      error: string;
    };

export type TransferPaymentResponse =
  | { success: true; eligible: boolean }
  | { success: false; error: string };

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

export type DiscordUser = {
  id: string;
  username: string;
};