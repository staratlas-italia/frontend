import { captureException } from "@sentry/nextjs";
import { useWallet } from "@solana/wallet-adapter-react";
import invariant from "invariant";
import { useRouter } from "next/router";
import { PropsWithChildren, ReactNode, useEffect } from "react";
import { useSwapStateAccount } from "~/components/SwapStateAccountGuard";

import { usePaymentStore } from "~/stores/usePaymentStore";
import { getRoute } from "~/utils/getRoute";

type Props = {
  loader?: ReactNode;
};

export const ReferenceRetriever = ({
  children,
  loader,
}: PropsWithChildren<Props>) => {
  const { publicKey } = useWallet();
  const { swapAccount } = useSwapStateAccount();

  const [reference, fetchReference] = usePaymentStore((s) => [
    s.reference,
    s.fetchReference,
  ]);

  const { query, replace } = useRouter();

  const { cluster } = query;

  useEffect(() => {
    if (publicKey && !reference) {
      try {
        fetchReference({ publicKey, swapAccount });
      } catch (e) {
        captureException(e, { level: "error" });

        replace(getRoute("/dashboard"));
      }
    }
  }, [reference, fetchReference, cluster, replace, publicKey, swapAccount]);

  if (reference === null && loader) {
    return <>{loader}</>;
  }

  if (!reference) {
    return null;
  }

  return <>{children}</>;
};

export const usePaymentReference = () => {
  const reference = usePaymentStore((s) => s.reference);

  invariant(
    reference,
    "This hook is meant to be used inside a ReferenceRetriever component"
  );

  return reference;
};
