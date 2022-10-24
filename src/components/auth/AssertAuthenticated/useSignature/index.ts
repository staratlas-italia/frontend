import invariant from "invariant";
import { useAuthStore } from "~/stores/useAuthStore";

export const useSignature = () => {
  const signature = useAuthStore((s) => s.signature);

  invariant(
    signature,
    "This hook is meant to be used inside the AssertAuthenticated component"
  );

  return signature;
};
