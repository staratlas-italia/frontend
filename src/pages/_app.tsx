import { ConnectionProvider } from "@solana/wallet-adapter-react";
import { Cluster } from "@solana/web3.js";
import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { ReactNode, useMemo } from "react";
import { IntlProvider } from "react-intl";
import "tailwindcss/tailwind.css";
import { MainLayout } from "~/components/layout/MainLayout";
import { ModalProvider } from "~/contexts/ModalContext";
import { ShipsProvider } from "~/contexts/ShipsContext";
import { useTranslations } from "~/i18n/useTranslations";
import { getConnectionContext } from "~/utils/connection";

const WalletProvider = dynamic<{ children: ReactNode }>(
  () =>
    import("../contexts/WalletProvider").then(
      ({ WalletProvider }) => WalletProvider
    ),
  {
    ssr: false,
  }
);

function App({ Component, pageProps }: AppProps) {
  const translations = useTranslations();
  const {
    locale,
    query: { cluster },
  } = useRouter();

  const endpoint = useMemo(
    () => getConnectionContext(cluster as Cluster).endpoint,
    [cluster]
  );

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
