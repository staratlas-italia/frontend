import { WalletError } from "@solana/wallet-adapter-base";
import { WalletProvider as BaseWalletProvider } from "@solana/wallet-adapter-react";
import {
  getLedgerWallet,
  getMathWallet,
  getPhantomWallet,
  getSolflareWallet,
  getSolletWallet,
  getSolongWallet,
} from "@solana/wallet-adapter-wallets";
import React, { useCallback, useMemo } from "react";

export const WalletProvider = ({ children }) => {
  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSolflareWallet(),
      // getTorusWallet({
      //   options: {
      //     // @FIXME: this should be changed for Metaplex, and by each Metaplex storefront
      //     clientId:
      //       'BOM5Cl7PXgE9Ylq1Z1tqzhpydY0RVr8k90QQ85N7AKI5QGSrr9iDC-3rvmy0K_hF0JfpLMiXoDhta68JwcxS1LQ',
      //   },
      // }),
      getLedgerWallet(),
      getSolongWallet(),
      getMathWallet(),
      getSolletWallet(),
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
