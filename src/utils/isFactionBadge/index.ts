import { PublicKey } from "@solana/web3.js";
import { CITIZEN_TOKEN_MINT_PER_FACTION } from "~/common/constants/citizenship";

export const isFactionBadge = (badgeMint: PublicKey) => {
  if (
    Object.values(CITIZEN_TOKEN_MINT_PER_FACTION)
      .map((s) => s.toString())
      .includes(badgeMint.toString())
  ) {
    return true;
  }

  return false;
};
