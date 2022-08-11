import invariant from "invariant";
import create from "zustand";
import { fetchPaymentReference } from "~/network/payments/reference";
import { usePlayerStore } from "~/stores/usePlayerStore";

type PaymentStore = {
  reference: string | null;
  fetchReference: () => void;
};

export const usePaymentStore = create<PaymentStore>((set) => ({
  reference: null,
  fetchReference: async () => {
    const self = usePlayerStore.getState().self;

    invariant(
      self,
      "This hook is meant to be used inside a SelfRetriever component"
    );

    const reference = await fetchPaymentReference(self._id.toString());

    set({ reference });
  },
}));
