import { captureException } from "@sentry/nextjs";
import { Cluster } from "@solana/web3.js";
import { useRouter } from "next/router";
import { PropsWithChildren, ReactNode, useEffect } from "react";
import { usePaymentStore } from "~/stores/usePaymentStore";
import { getRoute } from "~/utils/getRoute";

type Props = {
  loader?: ReactNode;
};

export const ReferenceRetriever = ({
  children,
  loader,
}: PropsWithChildren<Props>) => {
  const [reference, returnReference, fetchReference] = usePaymentStore((s) => [
    s.reference,
    s.returnReference,
    s.fetchReference,
  ]);

  const { query, replace } = useRouter();

  const { cluster } = query;

  useEffect(() => {
    if (!reference || !returnReference) {
      try {
        fetchReference(cluster as Cluster);
      } catch (e) {
        captureException(e, { level: "error" });

        replace(getRoute("/citizenship"));
      }
    }
  }, [reference, returnReference, fetchReference, cluster, replace]);

  if ((reference === null || returnReference === null) && loader) {
    return <>{loader}</>;
  }

  if (!reference || !returnReference) {
    return null;
  }

  return <>{children}</>;
};
