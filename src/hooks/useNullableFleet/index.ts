import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";
import { useSelf } from "~/hooks/useNullableSelf";
import { usePlayerStore } from "~/stores/usePlayerStore";

export const useNullableFleet = () => {
  const { publicKey } = useWallet();

  const self = useSelf();

  const fleet = usePlayerStore((state) => state.fleet);
  const fetchFleet = usePlayerStore((state) => state.fetchFleet);
  const isFetching = usePlayerStore((state) => state.fetching.fleets);

  useEffect(() => {
    if (isFetching) {
      return;
    }

    if (fleet && publicKey && self.wallets.includes(publicKey.toString())) {
      return;
    }

    fetchFleet();
  }, [self]);

  return {
    isFetching,
    fleet,
  };
};
