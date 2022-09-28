import { Cluster } from "@solana/web3.js";
import invariant from "invariant";
import { useRouter } from "next/router";
import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { ConnectionContext, getConnectionContext } from "~/utils/connection";

const Context = createContext<ConnectionContext | null>(null);

export const ClusterProvider = ({ children }: PropsWithChildren<unknown>) => {
  const { cluster } = useRouter().query;

  const endpoint = useMemo(
    () => getConnectionContext(cluster as Cluster),
    [cluster]
  );

  return <Context.Provider value={endpoint}>{children}</Context.Provider>;
};

export const useCluster = () => {
  const endpoint = useContext(Context);

  invariant(
    endpoint,
    "This hook is meant to be used inside a `ClusterProvider` component"
  );

  return endpoint;
};
