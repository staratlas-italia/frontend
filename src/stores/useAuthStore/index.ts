import { PublicKey } from "@solana/web3.js";
import create from "zustand";
import { persist } from "zustand/middleware";
import { getProofMessage } from "~/utils/getProofMessage";
import { isAdminPublicKey } from "~/utils/isAdminPublicKey";

type AuthStore = {
  signature: string | null;
  updatedAt: number | null;
  isValid: () => boolean;
  isAdmin: (publicKey: PublicKey | null) => boolean;
  updateSignature: (signature: string) => void;
  clear: () => void;
};

export const useAuthStore = create<AuthStore>(
  persist(
    (set, get) => ({
      signature: null,
      updatedAt: null,
      isValid: () => {
        const { updatedAt } = get();

        if (updatedAt) {
          const message = getProofMessage();

          return message === getProofMessage(updatedAt);
        }

        return false;
      },
      isAdmin: (publicKey: PublicKey | null) =>
        publicKey ? isAdminPublicKey(publicKey) : false,
      updateSignature: (signature: string) =>
        set({ signature, updatedAt: Date.now() }),
      clear: () => set({ signature: null, updatedAt: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);
