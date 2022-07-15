import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import create from "zustand";
import { usePlayerStore } from "~/stores/usePlayerStore";
import { getBadgeByMint } from "~/utils/getBadgeByMint";
import { getNfts, NFT } from "~/utils/splToken";

type BadgesStore = {
  badges: NFT[] | null;
  isFetching: boolean;
  clear: () => void;
  fetchBadges: (pk?: string) => void;
};

export const useBadgesStore = create<BadgesStore>((set, get) => ({
  badges: null,
  isFetching: false,
  fetchBadges: async (pk) => {
    if (get().isFetching) {
      return;
    }

    set({ isFetching: true });

    const publicKey = pk || usePlayerStore.getState().player?.publicKey;

    if (publicKey) {
      const connection = new Connection(clusterApiUrl("mainnet-beta"));
      const nfts = await getNfts(connection, new PublicKey(publicKey));

      set({
        badges: nfts.filter((nft) => getBadgeByMint(nft.mint)),
        isFetching: false,
      });
      return;
    }

    set({
      badges: [],
      isFetching: false,
    });
  },

  clear: () => set({ badges: null }),
}));
