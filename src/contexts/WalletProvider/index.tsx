import { WalletError } from "@solana/wallet-adapter-base";
import { WalletProvider as BaseWalletProvider } from "@solana/wallet-adapter-react";
import {
  LedgerWalletAdapter,
  MathWalletAdapter,
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  SolletWalletAdapter,
  SolongWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { useCallback, useMemo } from "react";

export const WalletProvider = ({ children }) => {
  const wallets = useMemo(
    () => [
      new LedgerWalletAdapter(),
      new MathWalletAdapter(),
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new SolletWalletAdapter(),
      new SolongWalletAdapter(),
    ],
    []
  );

  const onError = useCallback((error: WalletError) => {
    console.error(error);
  }, []);

  return (
    <BaseWalletProvider wallets={wallets} onError={onError} autoConnect>
      {children}
    </BaseWalletProvider>
  );
};
