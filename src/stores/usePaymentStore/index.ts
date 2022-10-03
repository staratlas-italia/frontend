import { Cluster } from "@solana/web3.js";
import invariant from "invariant";
import create from "zustand";
import { confirmPayment } from "~/network/payments/confirm";
import { fetchPaymentReference } from "~/network/payments/reference";
import { usePlayerStore } from "~/stores/usePlayerStore";
import { Faction } from "~/types";
import { getRoute } from "~/utils/getRoute";

type PaymentStore = {
  faction: Faction | null;
  reference: string | null;
  isConfirming: boolean;
  isFetchingReference: boolean;
  confirm: (_: {
    cluster: Cluster;
    faction: Faction;
    publicKey: string;
    reference: string;
  }) => Promise<string | null>;
  fetchReference: (cluster?: Cluster) => void;
};

export const usePaymentStore = create<PaymentStore>((set, get) => ({
  faction: null,
  reference: null,
  isConfirming: false,
  isFetchingReference: false,
  confirm: async ({ cluster, faction, publicKey, reference }) => {
    if (get().isConfirming) {
      return null;
    }

    set({ isConfirming: true });

    const response = await confirmPayment({
      cluster,
      faction,
      publicKey: publicKey.toString(),
      reference,
    });

    if (!response.success) {
      console.log(response);

      return getRoute("/citizenship/checkout/error");
    }

    if (response.verified) {
      return getRoute("/citizenship/checkout/confirmed");
    }

    set({ isConfirming: false });

    return null;
  },
  fetchReference: async (cluster) => {
    if (get().isFetchingReference) {
      return;
    }

    set({ isFetchingReference: true });

    const self = usePlayerStore.getState().self;

    invariant(
      self,
      "This hook is meant to be used inside a SelfRetriever component"
    );

    const reference = await fetchPaymentReference({
      cluster,
      userId: self._id.toString(),
    });

    set({ isFetchingReference: false, reference });
  },
}));
