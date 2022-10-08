import invariant from "invariant";
import { usePaymentStore } from "~/stores/usePaymentStore";

export const usePaymentReturnReference = () => {
  const returnReference = usePaymentStore((s) => s.returnReference);

  invariant(
    returnReference,
    "This hook is meant to be used inside a ReferenceRetriever component"
  );

  return returnReference;
};
