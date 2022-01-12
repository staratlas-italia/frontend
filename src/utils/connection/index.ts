import { Cluster, clusterApiUrl, Connection } from "@solana/web3.js";

export interface EndpointInfo {
  cluster: Cluster;
  name: string;
  url: string;
}

export const ENDPOINTS: EndpointInfo[] = [
  {
    cluster: "mainnet-beta",
    name: "Mainnet",
    url:
      process.env.MAIN_RPC_ENDPOINT ||
      process.env.BACKUP_RPC_ENDPOINT ||
      clusterApiUrl("mainnet-beta"),
  },
  {
    cluster: "devnet",
    name: "Devnet",
    url: process.env.DEVNET_RPC_ENDPOINT || clusterApiUrl("devnet"),
  },
  {
    cluster: "testnet",
    name: "Testnet",
    url: clusterApiUrl("testnet"),
  },
];

export interface ConnectionContext {
  name: string;
  cluster: Cluster;
  current: Connection;
  endpoint: string;
}

export function getConnectionContext(cluster: Cluster): ConnectionContext {
  const ENDPOINT = ENDPOINTS.find((e) => e.cluster === cluster) || ENDPOINTS[0];

  return {
    name: ENDPOINT!.name,
    cluster: ENDPOINT!.cluster as Cluster,
    current: new Connection(ENDPOINT!.url, "recent"),
    endpoint: ENDPOINT!.url,
  };
}
