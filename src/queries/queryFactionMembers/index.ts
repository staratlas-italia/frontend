import { query } from "~/queries/query";

export type FactionMemebersRow = {
  faction: 0 | 1 | 2;
  none_faction: number;
  total_member: number;
};

export const queryFactionMemebers = () => {
  const statement = `
    SELECT faction, count(*) - count(faction) as none_faction, count(faction) as total_member FROM \`fleetsnapshots.star_atlas.players\` GROUP BY faction ORDER BY faction
  `;

  return query<FactionMemebersRow[]>(statement);
};
