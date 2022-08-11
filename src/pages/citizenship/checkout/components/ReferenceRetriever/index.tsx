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

  useEffect(() => {
    fetchReference();
  }, [reference, fetchReference]);

  if (reference === null && loader) {
    return <>{loader}</>;
  }

  if (!reference) {
    return null;
  }

  return <>{children}</>;
};
