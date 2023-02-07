const withTM = require("next-transpile-modules")([
  "@blocto/sdk",
  "@project-serum/sol-wallet-adapter",
  "@solana/wallet-adapter-base",
  "@solana/wallet-adapter-react",
  "@solana/wallet-adapter-bitkeep",
  "@solana/wallet-adapter-bitpie",
  "@solana/wallet-adapter-blocto",
  "@solana/wallet-adapter-clover",
  "@solana/wallet-adapter-coin98",
  "@solana/wallet-adapter-coinhub",
  "@solana/wallet-adapter-ledger",
  "@solana/wallet-adapter-mathwallet",
  "@solana/wallet-adapter-phantom",
  "@solana/wallet-adapter-safepal",
  "@solana/wallet-adapter-slope",
  "@solana/wallet-adapter-solflare",
  "@solana/wallet-adapter-sollet",
  "@solana/wallet-adapter-solong",
  "@solana/wallet-adapter-tokenpocket",
  "@solana/wallet-adapter-torus",
]);

const { withSentryConfig } = require("@sentry/nextjs");

/** @type {import('next').NextConfig} */
const moduleExports = withTM({
  env: {
    ADMINS_PBKS: process.env.ADMINS_PBKS,
    APP_BASE_URL: process.env.APP_BASE_URL,
    DEVNET_RPC_ENDPOINT: process.env.DEVNET_RPC_ENDPOINT,
    DISCORD_OAUTH_URL: process.env.DISCORD_OAUTH_URL,
    ENVIRONMENT: process.env.ENVIRONMENT,
    GOOGLE_ANALYTICS_KEY: process.env.GOOGLE_ANALYTICS_KEY,
    GUILD_TREASURY_ADDR: process.env.GUILD_TREASURY_ADDR,
    MAIN_RPC_ENDPOINT: process.env.MAIN_RPC_ENDPOINT,
    STAR_ATLAS_API_URL: process.env.STAR_ATLAS_API_URL,
    FEATURES_ENDPOINT: process.env.FEATURES_ENDPOINT,
    DEV_FEATURES_ENDPOINT: process.env.DEV_FEATURES_ENDPOINT,
    SENTRY_DSN: process.env.SENTRY_DSN,
  },
  i18n: {
    locales: ["it", "en"],
    defaultLocale: "it",
  },
  images: {
    domains: ["storage.googleapis.com"],
    minimumCacheTTL: 86400,
  },
  pageExtensions: ["page.tsx", "page.ts", "api.ts"],
  reactStrictMode: true,
  trailingSlash: false,
  sentry: {
    // Use `hidden-source-map` rather than `source-map` as the Webpack `devtool`
    // for client-side builds. (This will be the default starting in
    // `@sentry/nextjs` version 8.0.0.) See
    // https://webpack.js.org/configuration/devtool/ and
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#use-hidden-source-map
    // for more information.
    hideSourceMaps: true,

    // This option will automatically provide performance monitoring for Next.js
    // data-fetching methods and API routes, making the manual wrapping of API
    // routes via `withSentry` redundant.
    autoInstrumentServerFunctions: false,
  },
});

// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
