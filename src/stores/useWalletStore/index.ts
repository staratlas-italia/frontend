import { SignerWalletAdapter } from "@solana/wallet-adapter-base";
import { Connection } from "@solana/web3.js";
import create, { State } from "zustand";
import { getConnectionContext } from "~/utils/connection";
import {
  getOwnedTokenAccounts,
  ProgramAccount,
  TokenAccount,
} from "~/utils/tokens";

type WalletStore = State & {
  connected: boolean;
  connection: Connection;
  current: SignerWalletAdapter | null;
  tokenAccounts: ProgramAccount<TokenAccount>[];
  actions: {
    fetchWalletTokenAccounts: () => void;
  };
  set: (x: any) => void;
};

export const useWalletStore = create<WalletStore>((set, get) => ({
  connected: false,
  current: null,
  connection: new Connection(getConnectionContext("mainnet-beta").endpoint),
  tokenAccounts: [],
  set: (fn) => set(fn),
  actions: {
    fetchWalletTokenAccounts: async () => {
      const connection = get().connection;
      const connected = get().connected;
      const wallet = get().current;
      const walletOwner = wallet?.publicKey;
      const set = get().set;

      if (connected && walletOwner) {
        const ownedTokenAccounts = await getOwnedTokenAccounts(
          connection,
          walletOwner
        );
        console.log(
          "fetchWalletTokenAccounts",
          connected,
          ownedTokenAccounts.map((t) => t.account.mint.toBase58())
        );

        set((state) => {
          state.tokenAccounts = ownedTokenAccounts;
        });
      } else {
        set((state) => {
          state.tokenAccounts = [];
        });
      }
    },
  },
}));
