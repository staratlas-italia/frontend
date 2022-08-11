import { Faction, factions } from "~/types";

export const isValidFaction = (factionName?: string) => {
  if (factions.includes(factionName?.toUpperCase() as Faction)) {
    return true;
  }

  return false;
};
