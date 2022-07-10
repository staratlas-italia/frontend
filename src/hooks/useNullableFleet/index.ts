import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";
import { useSelf } from "~/hooks/useNullableSelf";
import { useFleetStore } from "~/stores/useFleetStore";

export const useNullableFleet = () => {
  const { publicKey } = useWallet();

  const self = useSelf();

  const fleet = useFleetStore((state) => state.fleet);
  const fetchFleet = useFleetStore((state) => state.fetchFleet);
  const isFetching = useFleetStore((state) => state.isFetching);

  useEffect(() => {
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
