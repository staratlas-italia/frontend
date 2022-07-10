import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";
import { useSelf } from "~/hooks/useNullableSelf";
import { usePlayerStore } from "~/stores/usePlayerStore";

export const useNullableBadges = () => {
  const { publicKey } = useWallet();
  const self = useSelf();

  const badges = usePlayerStore((state) => state.badges);
  const fetchBadges = usePlayerStore((state) => state.fetchBadges);
  const isFetching = usePlayerStore((state) => state.fetching.badges);

  useEffect(() => {
    if (isFetching) {
      return;
    }

    if (badges && publicKey && self.wallets.includes(publicKey.toString())) {
      return;
    }

    fetchBadges();
  }, [self]);

  return {
    isFetching,
    badges,
  };
};
