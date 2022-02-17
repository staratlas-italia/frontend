import { Player } from "~/types";
import { appendQueryParams } from "~/utils/appendQueryParams";
import { getRoute } from "~/utils/getRoute";

export const fetchPlayer = async (pubkey: string): Promise<Player | null> => {
  try {
    const res = await fetch(
      appendQueryParams(getRoute("/api/player"), { pubkey })
    );
    return await res.json();
  } catch (e) {
    return null;
  }
};
