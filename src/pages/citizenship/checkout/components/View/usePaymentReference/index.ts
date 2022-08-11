import invariant from "invariant";
import { usePaymentStore } from "~/stores/usePaymentStore";

export const usePaymentReference = () => {
  const reference = usePaymentStore((s) => s.reference);

  invariant(
    reference,
    "This hook is meant to be used inside a ReferenceRetriever component"
  );

  return reference;
};
