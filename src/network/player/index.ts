import { api } from "~/network/api";
import { Player } from "~/types";
import { appendQueryParams } from "~/utils/appendQueryParams";
import { getApiRoute } from "~/utils/getRoute";

export const fetchPlayer = async (pubkey: string) => {
  try {
    return api.get<Player>(
      appendQueryParams(getApiRoute("/api/player"), { pubkey })
    );
  } catch (e) {
    return null;
  }
};
