import { Player } from "~/types";

export const fetchPlayer = async (pubkey: string): Promise<Player | null> => {
  try {
    const res = await fetch(`/api/player?pubkey=${pubkey}`);
    return await res.json();
  } catch (e) {
    return null;
  }
};
