import { query } from "~/queries/query";

export type TiersRow = {
  tier: 0 | 1 | 2;
  quantity: number;
};

export const queryTiers = () => {
  const statement = `
    SELECT tier, sum(quantity) as quantity FROM \`fleetsnapshots.star_atlas.players\` GROUP BY tier ORDER BY tier
  `;

  return query<TiersRow[]>(statement);
};
