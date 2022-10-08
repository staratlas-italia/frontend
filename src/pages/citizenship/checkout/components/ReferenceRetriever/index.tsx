import { Cluster } from "@solana/web3.js";
import { useRouter } from "next/router";
import { PropsWithChildren, ReactNode, useEffect } from "react";
import { usePaymentStore } from "~/stores/usePaymentStore";

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

  const { cluster } = useRouter().query;

  useEffect(() => {
    if (!reference || !returnReference) {
      fetchReference(cluster as Cluster);
    }
  }, [reference, returnReference, fetchReference, cluster]);

  if ((reference === null || returnReference === null) && loader) {
    return <>{loader}</>;
  }

  if (!reference || !returnReference) {
    return null;
  }

  return <>{children}</>;
};
