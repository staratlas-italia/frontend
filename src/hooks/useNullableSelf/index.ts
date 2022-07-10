import { useWallet } from "@solana/wallet-adapter-react";
import invariant from "invariant";
import { useEffect } from "react";
import { usePlayerStore } from "~/stores/usePlayerStore";

export const useNullableSelf = () => {
  const { publicKey } = useWallet();

  const self = usePlayerStore((state) => state.self);
  const fetchSelf = usePlayerStore((state) => state.fetchSelf);
  const isFetching = usePlayerStore((state) => state.fetching.self);

  useEffect(() => {
    if (isFetching) {
      return;
    }

    if (publicKey) {
      if (self && self.wallets?.includes(publicKey.toString())) {
        return;
      }

      fetchSelf(publicKey.toString());
    }
  }, [publicKey, isFetching]);

  return {
    isFetching: self === null,
    self,
  };
};

export const useSelf = () => {
  const self = usePlayerStore((s) => s.self);

  invariant(
    self,
    "This hook is meant to be used inside a `SelfRetriever` component!"
  );

  return self;
};
