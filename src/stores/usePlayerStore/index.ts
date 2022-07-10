import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import create, { State } from "zustand";
import { fetchPlayer } from "~/network/player";
import { getPlayerStakeShips } from "~/network/score";
import { fetchSelf } from "~/network/self";
import { getAllShips } from "~/network/ships/getAllShips";
import {
  Avatar,
  NormalizedShipStakingInfoExtended,
  Player,
  StarAtlasEntity,
} from "~/types";
import { Self } from "~/types/api";
import { getAvatarImageUrl } from "~/utils/getAvatarImageUrl";
import { getBadgeByMint } from "~/utils/getBadgeByMint";
import { getNfts, NFT } from "~/utils/splToken";

type FleetData = {
  ship: StarAtlasEntity;
  stakeInfo?: NormalizedShipStakingInfoExtended;
};

type PlayerStore = State & {
  self: Self | null;
  player: Player | null;
  fleet: FleetData[] | null;
  badges: NFT[] | null;
  fetching: {
    badges: boolean;
    fleets: boolean;
    self: boolean;
  };
  clear: () => void;
  fetchBadges: (pk?: string) => void;
  fetchFleet: (pk?: string) => void;
  fetchSelf: (publicKey: string) => void;
};

let ongoingRequest: Promise<[Player | null, Self | null]> | null = null;

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  self: null,
  player: null,
  fleet: null,
  badges: null,
  isFetching: null,
  fetching: {
    badges: false,
    fleets: false,
    self: false,
  },
  fetchSelf: async (publicKey) => {
    if (ongoingRequest) {
      return;
    }

    set((state) => ({
      self: null,
      fetching: { ...state.fetching, self: true },
    }));

    ongoingRequest = Promise.all([
      fetchPlayer(publicKey),
      fetchSelf(publicKey),
    ]);

    const [currentPlayer, self] = await ongoingRequest;

    if (currentPlayer) {
      const player = {
        ...currentPlayer,
        avatarImageUrl: getAvatarImageUrl(currentPlayer?.avatarId as Avatar),
      };

      set((state) => ({
        player,
        self,
        fetching: { ...state.fetching, self: false },
      }));
    } else {
      set((state) => ({
        self,
        fetching: {
          ...state.fetching,
          self: false,
        },
      }));
    }

    ongoingRequest = null;

    await get().fetchBadges(publicKey);
    await get().fetchFleet(publicKey);
  },
  fetchFleet: async (pk) => {
    set((state) => ({
      fleet: null,
      fetching: { ...state.fetching, fleet: true },
    }));

    const publicKey = pk || get().player?.publicKey;

    if (publicKey) {
      const response = await getPlayerStakeShips(publicKey);

      if (response.success) {
        const { data: playerFleet } = response;
        const ships = await getAllShips();

        const mints = playerFleet.map((i) => i.shipMint);
        const fleetShips = ships.filter((item) => mints.includes(item.mint));

        const fleet = fleetShips.map((ship) => ({
          ship,
          stakeInfo: playerFleet.find((item) => item.shipMint === ship.mint),
        }));

        set((state) => ({
          fleet,
          fetching: { ...state.fetching, fleet: false },
        }));
        return;
      }
    }

    set((state) => ({
      fleet: [],
      fetching: { ...state.fetching, fleet: false },
    }));
  },
  fetchBadges: async (pk) => {
    set((state) => ({
      badges: null,
      fetching: { ...state.fetching, badges: true },
    }));

    const publicKey = pk || get().player?.publicKey;

    if (publicKey) {
      const connection = new Connection(clusterApiUrl("mainnet-beta"));
      const nfts = await getNfts(connection, new PublicKey(publicKey));

      set((state) => ({
        badges: nfts.filter((nft) => getBadgeByMint(nft.mint)),
        fetching: { ...state.fetching, badges: false },
      }));
      return;
    }

    set((state) => ({
      badges: [],
      fetching: { ...state.fetching, badges: false },
    }));
  },

  clear: () => set({ self: null, player: null, fleet: [] }),
}));
