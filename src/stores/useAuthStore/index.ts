import { PublicKey } from "@solana/web3.js";
import create from "zustand";
import { persist } from "zustand/middleware";
import { isAdminPublicKey } from "~/utils/isAdminPublicKey";

type AuthStore = {
  signature: string | null;
  updatedAt: number | null;

  isAdmin: (publicKey: PublicKey | null) => boolean;
  updateSignature: (signature: string) => void;
  clear: () => void;
};

export const useAuthStore = create(
  persist<AuthStore>(
    (set, get) => ({
      signature: null,
      updatedAt: null,
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
