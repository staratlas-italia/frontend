import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";
import { useCluster } from "~/components/ClusterProvider";
import { useSelf } from "~/hooks/useNullableSelf";
import { useFleetStore } from "~/stores/useFleetStore";

export const useNullableFleet = () => {
  const { publicKey } = useWallet();
  const endpoint = useCluster();

  const self = useSelf();

  const fleet = useFleetStore((state) => state.fleet);
  const fetchFleet = useFleetStore((state) => state.fetchFleet);
  const isFetching = useFleetStore((state) => state.isFetching);

  useEffect(() => {
    if (fleet && publicKey && self.wallets.includes(publicKey.toString())) {
      return;
    }

    fetchFleet(endpoint.cluster);
  }, [self]);

  return {
    isFetching,
    fleet,
  };
};
