import { PublicKey } from "@solana/web3.js";
import create from "zustand";
import { persist } from "zustand/middleware";
import { isAdminPublicKey } from "~/utils/isAdminPublicKey";

type AuthStore = {
  signature: string | null;
  isAdmin: (publicKey: PublicKey | null) => boolean;
  updateSignature: (signature: string) => void;
};

export const useAuthStore = create<AuthStore>(
  persist(
    (set) => ({
      signature: null,
      isAdmin: (publicKey: PublicKey | null) =>
        publicKey ? isAdminPublicKey(publicKey) : false,
      updateSignature: (signature: string) => set({ signature }),
    }),
    {
      name: "auth-storage",
    }
  )
);
