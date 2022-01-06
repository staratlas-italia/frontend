import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ConnectionProvider } from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";
import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import { IntlProvider } from "react-intl";
import "tailwindcss/tailwind.css";
import { MainLayout } from "~/components/layout/MainLayout";
import { ModalProvider } from "~/contexts/ModalContext";
import { ShipsProvider } from "~/contexts/ShipsContext";
import { useTranslations } from "~/i18n/useTranslations";

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

const endpoint =
  process.env.MAIN_RPC_ENDPOINT ||
  process.env.BACKUP_RPC_ENDPOINT ||
  clusterApiUrl(network);

function App({ Component, pageProps }: AppProps) {
  const translations = useTranslations();
  const { locale } = useRouter();

  return (
    <ConnectionProvider endpoint={endpoint}>
      <IntlProvider
        messages={translations}
        locale={locale || "it"}
        defaultLocale="it"
      >
        <ModalProvider>
          <WalletProvider>
            <ShipsProvider>
              <MainLayout>
                <Component {...pageProps} />
              </MainLayout>
            </ShipsProvider>
          </WalletProvider>
        </ModalProvider>
      </IntlProvider>
    </ConnectionProvider>
  );
}

export default App;
