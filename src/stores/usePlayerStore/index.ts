import { Cluster, Connection, PublicKey } from "@solana/web3.js";
import create, { State } from "zustand";
import {
  ATLAS_TOKEN_MINT,
  POLIS_TOKEN_MINT,
  USDC_TOKEN_MINT,
} from "~/common/constants";
import { fetchPlayer } from "~/network/player";
import { fetchOrCreateSelf, linkDiscordId } from "~/network/self";
import { Avatar, Player } from "~/types";
import { Self } from "~/types/api";
import { getConnectionClusterUrl } from "~/utils/connection";
import { getAvatarImageUrl } from "~/utils/getAvatarImageUrl";
import { getTokenBalanceByMint } from "~/utils/getTokenBalanceByMint";
import { toTuple } from "~/utils/toTuple";

type PlayerStore = State & {
  self: Self | null;
  player: Player | null;
  isFetching: boolean;
  amounts: [number | null, number | null, number | null];
  linkDiscord: (_: {
    publicKey: string;
    discordId: string;
    signature: string;
  }) => void;
  fetchSelf: (cluster: Cluster, publicKey: string) => void;
  clear: () => void;
};

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  self: null,
  player: null,
  isFetching: false,
  amounts: [null, null, null],
  linkDiscord: async ({ discordId, publicKey, signature }) => {
    if (get().isFetching) {
      return;
    }

    set({ isFetching: true });

    const self = await linkDiscordId({
      discordId,
      publicKey,
      signature,
    });

    if (self) {
      set({
        self,
        isFetching: false,
      });
    }
  },
  fetchSelf: async (cluster, publicKey) => {
    if (get().isFetching) {
      return;
    }

    set({ isFetching: true });

    const connection = new Connection(getConnectionClusterUrl(cluster));

    const [currentPlayer, self, atlasAmount, polisAmount, usdcAmount] =
      await Promise.all([
        fetchPlayer(publicKey),
        fetchOrCreateSelf({ publicKey, cluster }),
        getTokenBalanceByMint(
          connection,
          new PublicKey(publicKey),
          ATLAS_TOKEN_MINT
        ).catch(() => null),
        getTokenBalanceByMint(
          connection,
          new PublicKey(publicKey),
          POLIS_TOKEN_MINT
        ).catch(() => null),
        getTokenBalanceByMint(
          connection,
          new PublicKey(publicKey),
          USDC_TOKEN_MINT
        ).catch(() => null),
      ]);

    const amounts = toTuple([atlasAmount, polisAmount, usdcAmount]);

    if (currentPlayer) {
      const player = {
        ...currentPlayer,
        avatarImageUrl: getAvatarImageUrl(currentPlayer?.avatarId as Avatar),
      };

      set({
        amounts,
        player,
        self,
        isFetching: false,
      });

      return;
    }

    set({
      amounts,
      self,
      isFetching: false,
    });
  },
  clear: () => set({ self: null, player: null }),
}));
