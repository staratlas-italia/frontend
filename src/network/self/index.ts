import { Cluster } from "@solana/web3.js";
import type { WithoutId } from "mongodb";
import { fetchPlayer } from "~/network/player";
import { Player } from "~/types";
import { Self } from "~/types/api";
import { appendQueryParams } from "~/utils/appendQueryParams";
import { getFactionName } from "~/utils/getFactionName";
import { getApiRoute } from "~/utils/getRoute";

const buildDefaultSelf = (
  publicKey: string,
  player: Player | null
): WithoutId<Self> => ({
  createdAt: new Date(),
  updatedAt: new Date(),
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
    : [null],
});

export const fetchOrCreateSelf = async ({
  cluster,
  publicKey,
}: {
  cluster: Cluster;
  publicKey: string;
}): Promise<Self | null> => {
  try {
    const res = await fetch(
      appendQueryParams(getApiRoute("/api/self"), { cluster, publicKey })
    );

    const response = await res.json();

    if (response.success) {
      return response.user;
    }

    const player = await fetchPlayer(publicKey);
    const targetSelf = buildDefaultSelf(publicKey, player);

    return insertSelf({ cluster, self: targetSelf });
  } catch (e) {
    return null;
  }
};

const insertSelf = async ({
  cluster,
  self,
}: {
  cluster: Cluster;
  self: WithoutId<Self>;
}): Promise<Self | null> => {
  try {
    const res = await fetch(getApiRoute("/api/self"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cluster, self }),
    });

    const response = await res.json();

    if (response.success) {
      return response.self;
    }

    return null;
  } catch (e) {
    return null;
  }
};
