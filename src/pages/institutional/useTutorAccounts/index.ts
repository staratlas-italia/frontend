import {
  DEVNET_TUTOR_TO_TOKEN_SWAP_STATE_ACCOUNTS,
  tutorAccounts,
  TUTOR_TO_TOKEN_SWAP_STATE_ACCOUNTS,
} from "~/common/constants/tutor";
import { useCluster } from "~/components/ClusterProvider";

export const useTutorAccounts = () => {
  const { cluster } = useCluster();

  if (cluster === "devnet") {
    return {
      accounts: DEVNET_TUTOR_TO_TOKEN_SWAP_STATE_ACCOUNTS,
      states: tutorAccounts.devnet.normal,
    };
  }

  return {
    accounts: TUTOR_TO_TOKEN_SWAP_STATE_ACCOUNTS,
    states: tutorAccounts["mainnet-beta"].normal,
  };
};
