import { Metadata, Metaplex } from "@metaplex-foundation/js";
import { captureException } from "@sentry/nextjs";
import { Connection, PublicKey } from "@solana/web3.js";
import { uniqWith } from "lodash";
import create from "zustand";
import { CITIZEN_TOKEN_MINT_PER_FACTION } from "~/common/constants";
import { getBadgeByMint } from "~/utils/getBadgeByMint";
import { toTuple } from "~/utils/toTuple";

type BadgesStore = {
  badges: [Metadata, any][] | null;
  isFetching: boolean;
  clear: () => void;
  fetchBadges: (connection: Connection, publicKey: PublicKey) => void;
};

export const useBadgesStore = create<BadgesStore>((set, get) => ({
  badges: null,
  isFetching: false,
  fetchBadges: async (connection, publicKey) => {
    if (get().badges || get().isFetching) {
      return;
    }

    set({ isFetching: true });

    try {
      const metaplex = Metaplex.make(connection, { cluster: "mainnet-beta" });

      const nfts = await metaplex.nfts().findAllByOwner({
        owner: new PublicKey(publicKey),
      });

      const sfts = await metaplex.nfts().findAllByMintList({
        mints: [
          CITIZEN_TOKEN_MINT_PER_FACTION.oni,
          CITIZEN_TOKEN_MINT_PER_FACTION.mud,
          CITIZEN_TOKEN_MINT_PER_FACTION.ustur,
        ],
      });

      const oweNfts = await Promise.all(
        uniqWith(
          [...nfts, ...sfts] as Metadata[],
          (a, b) => a.mintAddress.toString() === b.mintAddress.toString()
        )
          .filter((nft) => getBadgeByMint(nft.mintAddress))
          .map(async (nft) =>
            nft
              ? toTuple([
                  nft,
                  await fetch(nft.uri)
                    .then((res) => res.json())
                    .catch(() => ({})),
                ])
              : Promise.resolve(toTuple([nft, {}]))
          )
      );

      set({
        badges: oweNfts,
        isFetching: false,
      });
    } catch (error) {
      captureException(error);

      set({
        badges: [],
        isFetching: false,
      });
    }
  },

  clear: () => set({ badges: null }),
}));
