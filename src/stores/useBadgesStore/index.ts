import { LazyNft, Metaplex, Nft } from "@metaplex-foundation/js";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import create from "zustand";
import { usePlayerStore } from "~/stores/usePlayerStore";
import { getBadgeByMint } from "~/utils/getBadgeByMint";
import { toTuple } from "~/utils/toTuple";

type BadgesStore = {
  badges: [Nft | LazyNft, any][] | null;
  isFetching: boolean;
  clear: () => void;
  fetchBadges: (connection: Connection, pk?: string) => void;
};
const connection = new Connection(clusterApiUrl("mainnet-beta"));
const metaplex = Metaplex.make(connection, { cluster: "mainnet-beta" });

export const useBadgesStore = create<BadgesStore>((set, get) => ({
  badges: null,
  isFetching: false,
  fetchBadges: async (connection, pk) => {
    if (get().isFetching) {
      return;
    }

    set({ isFetching: true });

    const publicKey = pk || usePlayerStore.getState().player?.publicKey;

    if (publicKey) {
      const nfts = await metaplex
        .nfts()
        .findAllByOwner(publicKey as unknown as PublicKey)
        .run();

      console.log(nfts);

      const oweNfts = await Promise.all(
        nfts
          .filter((nft) => getBadgeByMint(nft.mintAddress))
          .map(async (nft) =>
            nft.lazy
              ? toTuple([
                  nft,
                  await fetch(nft.uri)
                    .then((res) => res.json())
                    .catch(() => ({})),
                ])
              : Promise.resolve(toTuple([nft, {}]))
          )
      );

      console.log(oweNfts);

      set({
        badges: oweNfts,
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
