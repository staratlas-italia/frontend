import { Cluster, clusterApiUrl } from "@solana/web3.js";

export interface EndpointInfo {
  cluster: Cluster;
  name: string;
  url: string;
}

export const clusterEndpoints: EndpointInfo[] = [
  {
    cluster: "mainnet-beta",
    name: "Mainnet",
    url: process.env.MAIN_RPC_ENDPOINT || clusterApiUrl("mainnet-beta"),
  },
  {
    cluster: "devnet",
    name: "Devnet",
    url: clusterApiUrl("devnet"),
  },
  {
    cluster: "testnet",
    name: "Testnet",
    url: clusterApiUrl("testnet"),
  },
];

export function getConnectionContext(cluster: Cluster): EndpointInfo {
  const endpoint =
    clusterEndpoints.find((e) => e.cluster === cluster) || clusterEndpoints[0];

  return endpoint;
}
