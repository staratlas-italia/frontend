const withTM = require("next-transpile-modules")([
  "@blocto/sdk",
  "@project-serum/sol-wallet-adapter",
  "@solana/wallet-adapter-base",
  "@solana/wallet-adapter-react",
  "@solana/wallet-adapter-wallets",

  "@solana/wallet-adapter-bitkeep",
  "@solana/wallet-adapter-bitpie",
  "@solana/wallet-adapter-blocto",
  "@solana/wallet-adapter-clover",
  "@solana/wallet-adapter-coin98",
  "@solana/wallet-adapter-ledger",
  "@solana/wallet-adapter-mathwallet",
  "@solana/wallet-adapter-phantom",
  "@solana/wallet-adapter-safepal",
  "@solana/wallet-adapter-slope",
  "@solana/wallet-adapter-solflare",
  "@solana/wallet-adapter-sollet",
  "@solana/wallet-adapter-solong",
  "@solana/wallet-adapter-torus",
]);

/** @type {import('next').NextConfig} */
module.exports = withTM({
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ["it", "en"],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: "it",
  },
  env: {
    // APP_VERSION: version,
    ENVIRONMENT: process.env.ENVIRONMENT,
  },
  reactStrictMode: true,
  trailingSlash: false,
  webpack5: true,
});
