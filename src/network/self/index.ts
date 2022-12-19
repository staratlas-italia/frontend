import { Cluster } from "@solana/web3.js";
import type { WithoutId } from "mongodb";
import { api } from "~/network/api";
import { fetchPlayer } from "~/network/player";
import { Player } from "~/types";
import { Self } from "~/types/api";
import { appendQueryParams } from "~/utils/appendQueryParams";
import { getFactionName } from "~/utils/getFactionName";
import { getProofMessage } from "~/utils/getProofMessage";
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

type SelfResponse =
  | {
      success: true;
      user: Self;
    }
  | {
      success: false;
      error: string;
    };

export const fetchOrCreateSelf = async ({
  cluster,
  publicKey,
}: {
  cluster: Cluster;
  publicKey: string;
}) => {
  try {
    const response = await api.get<SelfResponse>(
      appendQueryParams(getApiRoute("/api/self"), { cluster, publicKey })
    );

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
}) => {
  try {
    const response = await api.post<SelfResponse>(getApiRoute("/api/self"), {
      headers: {
        "Content-Type": "application/json",
      },
      body: { cluster, self },
    });

    if (response.success) {
      return response.user;
    }

    return null;
  } catch (e) {
    return null;
  }
};

export const linkDiscordId = async ({
  discordId,
  publicKey,
  signature,
}: {
  publicKey: string;
  discordId: string;
  signature: string;
}) => {
  try {
    const response = await api.post<SelfResponse>(
      getApiRoute("/api/self/link"),
      {
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          discordId,
          publicKey,
          signature,
          message: getProofMessage(),
        },
      }
    );

    if (response.success) {
      return response.user;
    }

    return null;
  } catch (e) {
    return null;
  }
};
