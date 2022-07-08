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
  env: {
    ADMINS_PBKS: process.env.ADMINS_PBKS,
    BACKUP_RPC_ENDPOINT: process.env.BACKUP_RPC_ENDPOINT,
    DEVNET_RPC_ENDPOINT: process.env.DEVNET_RPC_ENDPOINT,
    ENVIRONMENT: process.env.ENVIRONMENT,
    GOOGLE_ANALYTICS_KEY: process.env.GOOGLE_ANALYTICS_KEY,
    GUILD_TREASURY_ADDR: process.env.GUILD_TREASURY_ADDR,
    MAIN_RPC_ENDPOINT: process.env.MAIN_RPC_ENDPOINT,
    STAR_ATLAS_API_URL: process.env.STAR_ATLAS_API_URL,
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
});
