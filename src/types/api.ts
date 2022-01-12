import { NormalizedShipStakingInfo } from "~/types";

export type ScoreFleetResponse =
  | {
      success: false;
      error: string;
    }
  | {
      success: true;
      data: NormalizedShipStakingInfo[];
    };
