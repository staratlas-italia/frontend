import create, { State } from "zustand";
import { fetchPlayer } from "~/network/player";
import { fetchSelf } from "~/network/self";
import { useBadgesStore } from "~/stores/useBadgesStore";
import { useFleetStore } from "~/stores/useFleetStore";
import { Avatar, Player } from "~/types";
import { Self } from "~/types/api";
import { getAvatarImageUrl } from "~/utils/getAvatarImageUrl";

type PlayerStore = State & {
  self: Self | null;
  player: Player | null;
  isFetching: boolean;
  clear: () => void;
  fetchSelf: (publicKey: string) => void;
};

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  self: null,
  player: null,
  isFetching: false,
  fetchSelf: async (publicKey) => {
    if (get().isFetching) {
      return;
    }

    set({ isFetching: true });

    const [currentPlayer, self] = await Promise.all([
      fetchPlayer(publicKey),
      fetchSelf(publicKey),
    ]);

    if (currentPlayer) {
      const player = {
        ...currentPlayer,
        avatarImageUrl: getAvatarImageUrl(currentPlayer?.avatarId as Avatar),
      };

      set({
        player,
        self,
        isFetching: false,
      });
    } else {
      set({
        self,
        isFetching: false,
      });
    }

    useBadgesStore.getState().fetchBadges(publicKey);
    useFleetStore.getState().fetchFleet(publicKey);
  },
  clear: () => set({ self: null, player: null }),
}));
