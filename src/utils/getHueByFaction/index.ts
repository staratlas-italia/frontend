import { PublicKey } from "@solana/web3.js";
import { CITIZEN_TOKEN_MINT_PER_FACTION } from "~/common/constants";

export const getHueByFaction = (badgeMint: string) => {
  if (!badgeMint) return "0deg";

  switch (badgeMint) {
    case CITIZEN_TOKEN_MINT_PER_FACTION.mud.toString():
      return "140deg";
    case CITIZEN_TOKEN_MINT_PER_FACTION.oni.toString():
      return "40deg";
    case CITIZEN_TOKEN_MINT_PER_FACTION.ustur.toString():
      return "200deg";
    default:
      return "0deg";
  }
};
