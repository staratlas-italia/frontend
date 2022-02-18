import { query } from "~/queries/query";

export type FactionTiersRow = {
  tier: 0 | 1 | 2;
  quantity: number;
};

export const queryFactionTiers = () => {
  const statement = `
    SELECT * FROM \`fleetsnapshots.query_results.tier_quantity\`
  `;

  return query<FactionTiersRow[]>(statement);
};
