import create, { State } from "zustand";
import { fetchPlayer } from "~/network/player";
import { getPlayerStakeShips } from "~/network/score";
import { getAllShips } from "~/network/ships/getAllShips";
import {
  Avatar,
  NormalizedShipStakingInfoExtended,
  Player,
  StarAtlasEntity,
} from "~/types";
import { getAvatarImageUrl } from "~/utils/getAvatarImageUrl";

type FleetData = {
  ship: StarAtlasEntity;
  stakeInfo?: NormalizedShipStakingInfoExtended;
};

type PlayerStore = State & {
  current: Player | null;
  fleet: FleetData[] | null;
  isPlayer: boolean | null;
  fetchPlayer: (publicKey: string) => void;
  fetchFleet: () => void;
  clear: () => void;
};

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  current: null,
  fleet: null,
  isPlayer: null,
  fetchPlayer: async (pubkey) => {
    const player = await fetchPlayer(pubkey);

    if (player) {
      const current = {
        ...player,
        avatarImageUrl: getAvatarImageUrl(player?.avatarId as Avatar),
      };
      set({ current, isPlayer: true });
      return;
    }

    set({ isPlayer: false });
  },
  fetchFleet: async () => {
    set({ fleet: null });

    const current = get().current;

    if (current?.publicKey) {
      const response = await getPlayerStakeShips(current.publicKey);

      if (response.success) {
        const { data: playerFleet } = response;
        const ships = await getAllShips();
        const mints = playerFleet.map((i) => i.shipMint);
        const fleetShips = ships.filter((item) => mints.includes(item.mint));

        const fleet = fleetShips.map((ship) => ({
          ship,
          stakeInfo: playerFleet.find((item) => item.shipMint === ship.mint),
        }));

        set({ fleet });
        return;
      }
    }
    set({ fleet: [] });
  },
  clear: () => set({ current: null, fleet: [], isPlayer: null }),
}));
