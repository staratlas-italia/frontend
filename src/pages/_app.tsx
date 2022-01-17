import { ConnectionProvider, useWallet } from "@solana/wallet-adapter-react";
import { Cluster } from "@solana/web3.js";
import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useMemo } from "react";
import { IntlProvider } from "react-intl";
import { MainLayout } from "~/components/layout/MainLayout";
import { ModalProvider } from "~/contexts/ModalContext";
import { ShipsProvider } from "~/contexts/ShipsContext";
import { useTranslations } from "~/i18n/useTranslations";
import { usePlayerStore } from "~/stores/usePlayerStore";
import "~/styles/globals.css";
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

function App(props: AppProps) {
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
                <Pages {...props} />
              </MainLayout>
            </ShipsProvider>
          </WalletProvider>
        </ModalProvider>
      </IntlProvider>
    </ConnectionProvider>
  );
}

const Pages = ({ Component, pageProps }: AppProps) => {
  const { publicKey } = useWallet();

  const fetchPlayer = usePlayerStore((s) => s.fetchPlayer);
  const fetchFleet = usePlayerStore((s) => s.fetchFleet);

  useEffect(() => {
    const run = async () => {
      if (publicKey) {
        await fetchPlayer(publicKey.toString());
        await fetchFleet();
      }
    };
    run();
  }, [publicKey]);

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
