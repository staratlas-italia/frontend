import { Metadata, Metaplex } from "@metaplex-foundation/js";
import { captureException } from "@sentry/nextjs";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { Connection, PublicKey } from "@solana/web3.js";
import { compact, uniqWith } from "lodash";
import create from "zustand";
import { CITIZEN_TOKEN_MINT_PER_FACTION } from "~/common/constants/citizenship";
import { TUTOR_SWAP_TOKEN_MINT } from "~/common/constants/tutor";
import { createApiClient } from "~/network/api";
import { StarAtlasEntity } from "~/types";
import { getBadgeByMint } from "~/utils/getBadgeByMint";
import { toTuple } from "~/utils/toTuple";

type BadgesStore = {
  badges: [Metadata, any][] | null;
  isFetching: boolean;
  clear: () => void;
  fetchBadges: (connection: Connection, publicKey: PublicKey) => void;
};

const saApiClient = createApiClient(process.env.STAR_ATLAS_API_URL || "");

export const useBadgesStore = create<BadgesStore>((set, get) => ({
  badges: null,
  isFetching: false,
  fetchBadges: async (connection, publicKey) => {
    if (get().badges || get().isFetching) {
      return;
    }

    set({ isFetching: true });

    const entities = await saApiClient
      .get<StarAtlasEntity[]>("/nfts")
      .catch(() => [] as StarAtlasEntity[]);

    const badges = entities
      .filter((e) => e.attributes.class === "badge")
      .map((e) => e.mint);

    try {
      const metaplex = Metaplex.make(connection, { cluster: "mainnet-beta" });

      const nfts = await metaplex.nfts().findAllByOwner({
        owner: new PublicKey(publicKey),
      });

      const mints = [
        CITIZEN_TOKEN_MINT_PER_FACTION.oni,
        CITIZEN_TOKEN_MINT_PER_FACTION.mud,
        CITIZEN_TOKEN_MINT_PER_FACTION.ustur,
        TUTOR_SWAP_TOKEN_MINT,
      ];

      const sfts = await metaplex.nfts().findAllByMintList({
        mints,
      });

      const addresses = await Promise.all(
        mints.map((mint) => getAssociatedTokenAddress(mint, publicKey))
      );

      const tokens = await Promise.all(
        addresses.map((address) =>
          metaplex
            .tokens()
            .findTokenWithMintByAddress({
              address,
            })
            .catch(() => null)
        )
      );

      const finalSfts = sfts.filter(
        (sft) =>
          sft &&
          compact(tokens)
            .map((t) => t.mint.address.toString())
            .includes((sft as Metadata).mintAddress.toString())
      );

      const oweNfts = await Promise.all(
        uniqWith(
          [...nfts, ...finalSfts] as Metadata[],
          (a, b) => a.mintAddress.toString() === b.mintAddress.toString()
        )
          .filter(
            (nft) =>
              getBadgeByMint(nft.mintAddress) ||
              badges.includes(nft.mintAddress.toString())
          )
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

const citizenshipSelector = (state: BadgesStore) =>
  state.badges?.filter(([badge]) =>
    Object.values(CITIZEN_TOKEN_MINT_PER_FACTION)
      .map((p) => p.toString())
      .includes(badge.mintAddress.toString())
  );

const tutorSelector = (state: BadgesStore) =>
  state.badges?.find(([badge]) =>
    badge.mintAddress.equals(TUTOR_SWAP_TOKEN_MINT)
  );

export const useCitizenshipBadges = () => useBadgesStore(citizenshipSelector);
export const useTutorBadge = () => useBadgesStore(tutorSelector);
