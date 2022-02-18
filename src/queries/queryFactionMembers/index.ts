import { query } from "~/queries/query";

export type FactionMemebersRow = {
  faction: 0 | 1 | 2;
  total_member: number;
};

export const queryFactionMemebers = () => {
  const statement = `
    SELECT * FROM \`fleetsnapshots.query_results.faction_members_total\`
  `;

  return query<FactionMemebersRow[]>(statement);
};
