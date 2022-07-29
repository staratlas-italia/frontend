import { Cluster } from "@solana/web3.js";
import create from "zustand";
import { fetchPlayerStakeShips } from "~/network/score";
import { getAllShips } from "~/network/ships/getAllShips";
import { usePlayerStore } from "~/stores/usePlayerStore";
import { NormalizedShipStakingInfoExtended, StarAtlasEntity } from "~/types";

type FleetData = {
  ship: StarAtlasEntity;
  stakeInfo?: NormalizedShipStakingInfoExtended;
};

type FleetStore = {
  fleet: FleetData[] | null;
  isFetching: boolean;
  clear: () => void;
  fetchFleet: (cluster: Cluster, pk?: string) => void;
};

export const useFleetStore = create<FleetStore>((set, get) => ({
  fleet: null,
  isFetching: false,
  fetchFleet: async (cluster, pk) => {
    if (get().isFetching) {
      return;
    }

    set({ isFetching: true });

    const publicKey = pk || usePlayerStore.getState().player?.publicKey;

    if (publicKey) {
      console.log("[dd] cluster", cluster);
      const response = await fetchPlayerStakeShips(cluster, publicKey);

      if (response.success) {
        const { data: playerFleet } = response;
        const ships = await getAllShips();

        const mints = playerFleet.map((i) => i.shipMint);
        const fleetShips = ships.filter((item) => mints.includes(item.mint));

        const fleet = fleetShips.map((ship) => ({
          ship,
          stakeInfo: playerFleet.find((item) => item.shipMint === ship.mint),
        }));

        set({ fleet, isFetching: false });
        return;
      }
    }

    set({
      fleet: [],
      isFetching: false,
    });
  },
  clear: () => set({ fleet: [] }),
}));
