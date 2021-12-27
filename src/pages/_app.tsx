import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ConnectionProvider } from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";
import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import React, { ReactNode, useMemo } from "react";
import "tailwindcss/tailwind.css";
import { BaseLayout } from "~/components/layout/BaseLayout";
import { ModalProvider } from "~/contexts/ModalContext";
import { ShipsProvider } from "~/contexts/ShipsContext";

const WalletProvider = dynamic<{ children: ReactNode }>(
  () =>
    import("../contexts/WalletProvider").then(
      ({ WalletProvider }) => WalletProvider
    ),
  {
    ssr: false,
  }
);

const network = WalletAdapterNetwork.Mainnet;

function App({ Component, pageProps }: AppProps) {
  const endpoint = useMemo(() => clusterApiUrl(network), []);
  return (
    <ConnectionProvider endpoint={endpoint}>
      <ModalProvider>
        <WalletProvider>
          <ShipsProvider>
            <BaseLayout>
              <Component {...pageProps} />
            </BaseLayout>
          </ShipsProvider>
        </WalletProvider>
      </ModalProvider>
    </ConnectionProvider>
  );
}

export default App;
