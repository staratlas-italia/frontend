import { GrowthBook, GrowthBookProvider } from "@growthbook/growthbook-react";
import { ConnectionProvider } from "@solana/wallet-adapter-react";
import { Cluster } from "@solana/web3.js";
import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect, useMemo } from "react";
import { IntlProvider } from "react-intl";
import { MainLayout } from "~/components/layout/MainLayout";
import { PreloadResources } from "~/components/PreloadResources";
import { ModalProvider } from "~/contexts/ModalContext";
import { ShipsProvider } from "~/contexts/ShipsContext";
import { useTranslations } from "~/i18n/useTranslations";
import "~/styles/globals.css";
import { StrictReactNode } from "~/types";
import { getConnectionContext } from "~/utils/connection";

const WalletProvider = dynamic<{ children: StrictReactNode }>(
  () =>
    import("../contexts/WalletProvider").then(
      ({ WalletProvider }) => WalletProvider
    ),
  {
    ssr: false,
  }
);

const growthbook = new GrowthBook();

function App({ router, ...props }: AppProps) {
  const translations = useTranslations();

  const {
    locale,
    query: { cluster },
  } = useRouter();

  const endpoint = useMemo(
    () => getConnectionContext(cluster as Cluster).endpoint,
    [cluster]
  );

  useEffect(() => {
    if (!process.env.FEATURES_ENDPOINT) {
      return;
    }

    fetch(process.env.FEATURES_ENDPOINT)
      .then((res) => res.json())
      .then((json) => {
        growthbook.setFeatures(json.features);
      });
  }, []);

  return (
    <GrowthBookProvider growthbook={growthbook}>
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
    </GrowthBookProvider>
  );
}

const Pages = ({ Component, pageProps }: Omit<AppProps, "router">) => {
  // const { publicKey } = useWallet();

  // const fetchPlayer = usePlayerStore((s) => s.fetchPlayer);
  // const fetchFleet = usePlayerStore((s) => s.fetchFleet);
  // const fetchBadges = usePlayerStore((s) => s.fetchBadges);

  // useEffect(() => {
  //   const run = async () => {
  //     if (publicKey) {
  //       await fetchPlayer(publicKey.toString());
  //       await fetchFleet();
  //       await fetchBadges();
  //     }
  //   };
  //   run();
  // }, [publicKey]);

  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_KEY}`}
      />
      <Script strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.GOOGLE_ANALYTICS_KEY}'); 
        `}
      </Script>

      <Script strategy="lazyOnload">
        {`  
          (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:3054503,hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `}
      </Script>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <PreloadResources />

      <Component {...pageProps} />
    </>
  );
};

export default App;
