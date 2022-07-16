import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";
import { useSelf } from "~/hooks/useNullableSelf";
import { useBadgesStore } from "~/stores/useBadgesStore";

export const useNullableBadges = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const self = useSelf();

  const badges = useBadgesStore((state) => state.badges);
  const fetchBadges = useBadgesStore((state) => state.fetchBadges);
  const isFetching = useBadgesStore((state) => state.isFetching);

  useEffect(() => {
    if (badges && publicKey && self.wallets.includes(publicKey.toString())) {
      return;
    }

    fetchBadges(connection);
  }, [self]);

  return {
    isFetching,
    badges,
  };
};
