import { ReactNode } from "react";
import { useNullableBadges } from "~/hooks/useNullableBadges";

type Props = {
  loader?: ReactNode;
  children: ReactNode;
};

export const BadgesRetriever = ({ children, loader }: Props) => {
  const { badges, isFetching } = useNullableBadges();

  if (isFetching) {
    return loader ? <>{loader}</> : null;
  }

  if (!badges) {
    return null;
  }

  return <>{children}</>;
};
