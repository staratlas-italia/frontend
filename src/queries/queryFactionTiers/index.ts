import { query } from "~/queries/query";

export type FactionTiersRow = {
  faction: null | 0 | 1 | 2;
  tier: 0 | 1 | 2;
  quantity: number;
};

export const queryFactionTiers = () => {
  const statement = `
    SELECT faction, tier, SUM(quantity) as quantity FROM \`fleetsnapshots.star_atlas.players\` GROUP BY faction, tier ORDER BY tier
  `;

  return query<FactionTiersRow[]>(statement);
};
