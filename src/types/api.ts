import { WithId } from "mongodb";
import { FactionWithNone, NormalizedShipStakingInfoExtended } from "~/types";

type Tag = "cat-lover";

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
  tags?: Tag[];
}>;

export type PaymentReferenceResponse =
  | {
      success: false;
      error: string;
    }
  | { success: true; reference: string };

export type TransactionStatus = "ACCEPTED" | "PENDING" | "REJECTED";

export type Transaction<Meta = Record<string, string | number>> = {
  meta: Meta;
  createdAt: Date;
  publicKey: string;
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

export type DiscordUser = {
  id: string;
  username: string;
};
