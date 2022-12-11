import { TOKEN_SWAP_STATE_ACCOUNTS } from "~/common/constants";

export const isValidSwapStateAccount = (swapState?: string) => {
  return !!swapState && !!TOKEN_SWAP_STATE_ACCOUNTS[swapState];
};
