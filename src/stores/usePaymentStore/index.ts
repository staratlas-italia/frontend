import { Cluster } from "@solana/web3.js";
import invariant from "invariant";
import create from "zustand";
import { fetchPaymentReference } from "~/network/payments/reference";
import { usePlayerStore } from "~/stores/usePlayerStore";
import { Faction } from "~/types";

type PaymentStore = {
  faction: Faction | null;
  reference: string | null;
  isFetching: boolean;
  fetchReference: (cluster?: Cluster) => void;
  setCurrentFaction: (faction: Faction) => void;
};

export const usePaymentStore = create<PaymentStore>((set, get) => ({
  faction: null,
  reference: null,
  isFetching: false,
  setCurrentFaction: (faction) => set({ faction }),
  fetchReference: async (cluster) => {
    if (get().isFetching) {
      return;
    }

    set({ isFetching: true });

    const self = usePlayerStore.getState().self;

    invariant(
      self,
      "This hook is meant to be used inside a SelfRetriever component"
    );

    const reference = await fetchPaymentReference({
      cluster,
      userId: self._id.toString(),
    });

    set({ isFetching: false, reference });
  },
}));
