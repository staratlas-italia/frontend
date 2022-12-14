import { useWallet } from "@solana/wallet-adapter-react";
import invariant from "invariant";
import { useEffect } from "react";
import { useCluster } from "~/components/ClusterProvider";
import { useFleetStore } from "~/stores/useFleetStore";

export const useNullableFleet = () => {
  const { publicKey } = useWallet();
  const endpoint = useCluster();
  const fleet = useFleetStore((state) => state.fleet);
  const fetchFleet = useFleetStore((state) => state.fetchFleet);
  const isFetching = useFleetStore((state) => state.isFetching);

  useEffect(() => {
    if (!publicKey) {
      return;
    }

    fetchFleet(endpoint.cluster, publicKey);
  }, [endpoint.cluster, fetchFleet, publicKey]);

  return {
    isFetching,
    fleet,
  };
};

export const useFleet = () => {
  const fleet = useFleetStore((state) => state.fleet);

  invariant(
    fleet,
    "This hook is meant to be used inside a FleetRetriever component."
  );

  return fleet;
};
