import create, { State } from "zustand";
import { fetchPlayer } from "~/network/player";
import { Avatar, Player } from "~/types";
import { getAvatarImageUrl } from "~/utils/getAvatarImageUrl";

type PlayerStore = State & {
  current: Player | null;
  fetchPlayer: (publicKey: string) => void;
};

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  current: null,
  fetchPlayer: async (pubkey) => {
    const player: Player = await fetchPlayer(pubkey);
    const current = {
      ...player,
      avatarImageUrl: getAvatarImageUrl(player?.avatarId as Avatar),
    };
    set({ current });
  },
}));
