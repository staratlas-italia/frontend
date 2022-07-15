import { ReactNode } from "react";
import { useNullableSelf } from "~/hooks/useNullableSelf";

type Props = {
  loader?: ReactNode;
  children: ReactNode;
};

export const SelfRetriever = ({ children, loader }: Props) => {
  const { isFetching, self } = useNullableSelf();

  if (isFetching && loader) {
    return <>{loader}</>;
  }

  if (!self) {
    return null;
  }

  return <>{children}</>;
};
