import { query } from "~/queries/query";

export type AvgShipsQuantityRow = { mint: string; avgQuantity: number };

export const queryAvgShipsQuantity = () => {
  const statement = `
    SELECT mint, AVG(quantity) as avgQuantity FROM \`fleetsnapshots.query_results.faction_members_token\` group by mint
  `;

  return query<AvgShipsQuantityRow[]>(statement);
};
