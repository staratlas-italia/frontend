import { PublicKey } from "@solana/web3.js";
import { CITIZEN_TOKEN_MINT_PER_FACTION } from "~/common/constants";

export const getFactionByBadgeMint = (badgeMint: PublicKey) => {
  if (!badgeMint) return false;

  if (
    badgeMint.toString() != CITIZEN_TOKEN_MINT_PER_FACTION.mud.toString() &&
    badgeMint.toString() != CITIZEN_TOKEN_MINT_PER_FACTION.oni.toString() &&
    badgeMint.toString() != CITIZEN_TOKEN_MINT_PER_FACTION.ustur.toString()
  )
    return false;

  return true;
};
