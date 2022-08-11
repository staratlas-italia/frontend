import { fetchPlayer } from "~/network/player";
import { Player } from "~/types";
import { Self } from "~/types/api";
import { appendQueryParams } from "~/utils/appendQueryParams";
import { getFactionName } from "~/utils/getFactionName";
import { getApiRoute } from "~/utils/getRoute";

const buildDefaultSelf = (publicKey: string, player: Player | null) => ({
  // TODO:fix this
  // _id: new ObjectId(),
  discordId: null,
  wallets: [publicKey],
  notifications: false,
  players: player
    ? [
        {
          country: player.country,
          faction: getFactionName(player.faction as any),
          publicKey: player.publicKey,
          registrationDate: new Date(player.registrationDate),
        },
      ]
    : [],
});

export const fetchSelf = async (publicKey: string): Promise<Self | null> => {
  try {
    const res = await fetch(
      appendQueryParams(getApiRoute("/api/self"), { publicKey })
    );
    const response = await res.json();

    if (response.success) {
      return response.user;
    }

    const player = await fetchPlayer(publicKey);

    return buildDefaultSelf(publicKey, player);
  } catch (e) {
    const player = await fetchPlayer(publicKey);

    return buildDefaultSelf(publicKey, player);
  }
};
