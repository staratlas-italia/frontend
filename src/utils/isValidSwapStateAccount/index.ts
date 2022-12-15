import { Cluster } from "@solana/web3.js";
import {
  DEVNET_TOKEN_SWAP_STATE_ACCOUNTS,
  TOKEN_SWAP_STATE_ACCOUNTS,
} from "~/common/constants";

export const isValidSwapStateAccount = (
  cluster: Cluster,
  swapAccount?: string
) => {
  const accounts =
    cluster === "devnet"
      ? DEVNET_TOKEN_SWAP_STATE_ACCOUNTS
      : TOKEN_SWAP_STATE_ACCOUNTS;

  return !!swapAccount && !!accounts[swapAccount];
};
