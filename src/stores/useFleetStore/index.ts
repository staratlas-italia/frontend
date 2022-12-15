import { Cluster, PublicKey } from "@solana/web3.js";
import create from "zustand";
import { fetchPlayerStakeShips } from "~/network/score";
import { getAllShips } from "~/network/ships/getAllShips";
import { NormalizedShipStakingInfoExtended, StarAtlasEntity } from "~/types";

type FleetData = {
  ship: StarAtlasEntity;
  stakeInfo?: NormalizedShipStakingInfoExtended;
};

type FleetStore = {
  fleet: FleetData[] | null;
  isFetching: boolean;
  clear: () => void;
  fetchFleet: (cluster: Cluster, publicKey: PublicKey) => void;
};

export const useFleetStore = create<FleetStore>((set, get) => ({
  fleet: null,
  isFetching: false,
  fetchFleet: async (cluster, publicKey) => {
    if (get().fleet || get().isFetching) {
      return;
    }

    set({ isFetching: true });

    const response = await fetchPlayerStakeShips(cluster, publicKey.toString());

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

    set({ fleet: [], isFetching: false });
  },
  clear: () => set({ fleet: [] }),
}));
