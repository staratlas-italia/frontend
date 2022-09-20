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
  const [reference, fetchReference] = usePaymentStore((s) => [
    s.reference,
    s.fetchReference,
  ]);

  const { cluster } = useRouter().query;

  useEffect(() => {
    if (!reference) {
      fetchReference(cluster as Cluster);
    }
  }, [reference, fetchReference, cluster]);

  if (reference === null && loader) {
    return <>{loader}</>;
  }

  if (!reference) {
    return null;
  }

  return <>{children}</>;
};
