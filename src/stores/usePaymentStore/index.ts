import { Cluster, PublicKey } from "@solana/web3.js";
import create from "zustand";
import { confirmPayment } from "~/network/payments/confirm";
import { fetchPaymentReference } from "~/network/payments/reference";

type PaymentStore = {
  reference: string | null;
  isConfirming: boolean;
  isFetchingReference: boolean;
  confirm: (_: {
    amount: number;
    publicKey: string;
    reference: string;
  }) => Promise<boolean | null>;
  fetchReference: (_: {
    cluster?: Cluster;
    publicKey: PublicKey;
    swapAccount: PublicKey;
  }) => void;
};

export const usePaymentStore = create<PaymentStore>((set, get) => ({
  reference: null,
  isConfirming: false,
  isFetchingReference: false,
  confirm: async ({ amount, publicKey, reference }) => {
    if (get().isConfirming) {
      return null;
    }

    set({ isConfirming: true });

    const response = await confirmPayment({
      amount,
      publicKey: publicKey.toString(),
      reference,
    });

    set({ isConfirming: false });

    if (!response.success) {
      return false;
    }

    if (response.verified) {
      return true;
    }

    return null;
  },
  fetchReference: async ({ cluster, publicKey, swapAccount }) => {
    if (get().isFetchingReference) {
      return null;
    }

    set({ isFetchingReference: true });

    const response = await fetchPaymentReference({
      cluster,
      swapAccount: swapAccount.toString(),
      publicKey: publicKey.toString(),
    });

    const { reference } = response || {
      reference: null,
    };

    set({ isFetchingReference: false, reference });
  },
}));
