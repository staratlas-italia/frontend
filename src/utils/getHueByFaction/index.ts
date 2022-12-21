import { CITIZEN_TOKEN_MINT_PER_FACTION } from "~/common/constants/citizenship";

export const getHueByFactionStyle = (badgeMint: string) => {
  switch (badgeMint) {
    case CITIZEN_TOKEN_MINT_PER_FACTION.mud.toString():
      return 140;
    case CITIZEN_TOKEN_MINT_PER_FACTION.oni.toString():
      return 40;
    case CITIZEN_TOKEN_MINT_PER_FACTION.ustur.toString():
      return 200;
    default:
      return 0;
  }
};
