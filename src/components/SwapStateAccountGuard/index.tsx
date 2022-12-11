import invariant from "invariant";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";
import { TOKEN_SWAP_STATE_ACCOUNTS } from "~/common/constants";
import { Redirect } from "~/components/common/Redirect";
import { getRoute } from "~/utils/getRoute";
import { isValidSwapStateAccount } from "~/utils/isValidSwapStateAccount";

export const SwapStateAccountGuard = ({
  children,
}: PropsWithChildren<unknown>) => {
  const { swapAccount } = useRouter().query;

  if (!isValidSwapStateAccount(swapAccount as string)) {
    return <Redirect replace to={getRoute("/citizenship")} />;
  }

  return <>{children}</>;
};

export const useSwapStateAccount = () => {
  const { swapAccount } = useRouter().query;

  invariant(
    swapAccount,
    "This hook is meant to be used insied a SwapStateAccountGuard component"
  );

  return TOKEN_SWAP_STATE_ACCOUNTS[swapAccount as string];
};
