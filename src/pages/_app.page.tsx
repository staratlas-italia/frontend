import { GrowthBookProvider } from "@growthbook/growthbook-react";
import { ConnectionProvider } from "@solana/wallet-adapter-react";
import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect } from "react";
import { IntlProvider } from "react-intl";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FEATURES_ENDPOINT, growthbook } from "~/common/constants";
import { ClusterProvider, useCluster } from "~/components/ClusterProvider";
import { EasterEgg } from "~/components/EasterEgg";
import { EasterEggModal } from "~/components/EasterEgg/Modal";
import { HtmlComment } from "~/components/HtmlComment";
import { MainLayout } from "~/components/layout/MainLayout";
import { PreloadResources } from "~/components/PreloadResources";
import { ModalProvider } from "~/contexts/ModalContext";
import { ShipsProvider } from "~/contexts/ShipsContext";
import { useTranslations } from "~/i18n/useTranslations";
import "~/styles/globals.css";
import { StrictReactNode } from "~/types";

const WalletProvider = dynamic<{ children: StrictReactNode }>(
  () =>
    import("../contexts/WalletProvider").then(
      ({ WalletProvider }) => WalletProvider
    ),
  {
    ssr: false,
  }
);

function App({ router, ...props }: AppProps) {
  const translations = useTranslations();

  const { locale } = useRouter();

  useEffect(() => {
    if (!FEATURES_ENDPOINT) {
      return;
    }

    fetch(FEATURES_ENDPOINT, { cache: "no-store" })
      .then((res) => res.json())
      .then((json) => {
        growthbook.setFeatures(json.features);

        growthbook.setAttributes({
          url: window.location.href,
          userAgent: navigator.userAgent,
        });
      });
  }, []);

  return (
    <GrowthBookProvider growthbook={growthbook}>
      <HtmlComment text="You're looking at the right place?" />
      <ClusterProvider>
        <IntlProvider
          messages={translations}
          locale={locale || "it"}
          defaultLocale="it"
        >
          <ModalProvider>
            <WalletProvider>
              <ShipsProvider>
                <ToastContainer />

                <MainLayout>
                  <EasterEgg iterations={1} />
                  <EasterEggModal />

                  <Pages {...props} />
                </MainLayout>
              </ShipsProvider>
            </WalletProvider>
          </ModalProvider>
        </IntlProvider>
      </ClusterProvider>
    </GrowthBookProvider>
  );
}

const Pages = ({ Component, pageProps }: Omit<AppProps, "router">) => {
  const endpoint = useCluster();

  return (
    <ConnectionProvider endpoint={endpoint.url}>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_KEY}`}
      />
      <Script strategy="lazyOnload" id="tagmanager">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.GOOGLE_ANALYTICS_KEY}'); 
        `}
      </Script>

      <Script strategy="lazyOnload" id="hotjar">
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
    </ConnectionProvider>
  );
};

export default App;
