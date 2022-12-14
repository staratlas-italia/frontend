import { ReactNode } from "react";
import { useNullableFleet } from "~/hooks/useNullableFleet";

type Props = {
  loader?: ReactNode;
  children: ReactNode;
};

export const FleetRetriever = ({ children, loader }: Props) => {
  const { isFetching, fleet } = useNullableFleet();

  if (isFetching) {
    return loader ? <>{loader}</> : null;
  }

  if (!fleet) {
    return null;
  }

  return <>{children}</>;
};
