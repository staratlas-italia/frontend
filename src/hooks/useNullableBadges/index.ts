import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import invariant from "invariant";
import { useEffect } from "react";
import { useBadgesStore } from "~/stores/useBadgesStore";

export const useNullableBadges = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const { badges, fetchBadges, isFetching } = useBadgesStore();

  useEffect(() => {
    if (!publicKey) {
      return;
    }

    fetchBadges(connection, publicKey);
  }, [connection, fetchBadges, publicKey]);

  return {
    isFetching,
    badges,
  };
};

export const useBadges = () => {
  const badges = useBadgesStore((state) => state.badges);

  invariant(
    badges,
    "This hook is meant to be used inside a BadgesRetriever component."
  );

  return badges;
};
