import {
  DEVNET_FACTION_TO_TOKEN_SWAP_STATE_ACCOUNTS,
  FACTION_TO_TOKEN_SWAP_STATE_ACCOUNTS,
  FACTION_TO_TOKEN_SWAP_STATE_ACCOUNTS_DISCOUNTED,
} from "~/common/constants/citizenship";
import { useCluster } from "~/components/ClusterProvider";
import { useNullableSelf } from "~/hooks/useNullableSelf";

export const useFactionAccounts = () => {
  const { cluster } = useCluster();
  const { self } = useNullableSelf();

  if (cluster === "devnet") {
    return DEVNET_FACTION_TO_TOKEN_SWAP_STATE_ACCOUNTS;
  }

  return !!self?.discordId
    ? FACTION_TO_TOKEN_SWAP_STATE_ACCOUNTS_DISCOUNTED
    : FACTION_TO_TOKEN_SWAP_STATE_ACCOUNTS;
};
