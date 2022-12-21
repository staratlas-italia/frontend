import { useFeature } from "@growthbook/growthbook-react";
import invariant from "invariant";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";
import {
  DEVNET_TOKEN_SWAP_STATE_ACCOUNTS,
  TOKEN_SWAP_STATE_ACCOUNTS,
} from "~/common/constants";
import { isCitizenshipSwap } from "~/common/constants/citizenship";
import { isTutorSwap } from "~/common/constants/tutor";
import { useCluster } from "~/components/ClusterProvider";
import { Redirect } from "~/components/common/Redirect";
import { getRoute } from "~/utils/getRoute";
import { isValidSwapStateAccount } from "~/utils/isValidSwapStateAccount";

export const SwapStateAccountGuard = ({
  children,
}: PropsWithChildren<unknown>) => {
  const { cluster } = useCluster();
  const { swapAccount } = useRouter().query;

  const isTutorPurchaseDisabled = useFeature(
    "sai-frontend-enabled-tutor-purchase"
  ).off;

  const isCitizenshipPurchaseDisabled = useFeature(
    "sai-frontend-enabled-citizenship-purchase"
  ).off;

  if (!isValidSwapStateAccount(cluster, swapAccount as string)) {
    return <Redirect replace to={getRoute("/dashboard")} />;
  }

  if (isTutorPurchaseDisabled && isTutorSwap(swapAccount as string)) {
    return <Redirect replace to={getRoute("/dashboard")} />;
  }

  if (
    isCitizenshipPurchaseDisabled &&
    isCitizenshipSwap(swapAccount as string)
  ) {
    return <Redirect replace to={getRoute("/dashboard")} />;
  }

  return <>{children}</>;
};

export const useSwapStateAccount = () => {
  const { cluster } = useCluster();
  const { swapAccount } = useRouter().query;

  invariant(
    swapAccount,
    "This hook is meant to be used insied a SwapStateAccountGuard component"
  );

  return (
    cluster === "devnet"
      ? DEVNET_TOKEN_SWAP_STATE_ACCOUNTS
      : TOKEN_SWAP_STATE_ACCOUNTS
  )[swapAccount as string];
};
