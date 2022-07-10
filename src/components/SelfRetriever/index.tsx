import { ReactNode } from "react";
import { LoadingView } from "~/components/LoadingView";
import { useNullableSelf } from "~/hooks/useNullableSelf";

export const SelfRetriever = ({ children }: { children: ReactNode }) => {
  const { isFetching, self } = useNullableSelf();

  if (isFetching) {
    return <LoadingView />;
  }

  if (!self) {
    return null;
  }

  return <>{children}</>;
};
