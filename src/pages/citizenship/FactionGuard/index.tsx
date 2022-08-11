import invariant from "invariant";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";
import { Redirect } from "~/components/common/Redirect";
import { Faction } from "~/types";
import { isValidFaction } from "~/utils/isFaction";

export const FactionGuard = ({ children }: PropsWithChildren<unknown>) => {
  const { faction } = useRouter().query;

  if (!isValidFaction(faction as string)) {
    return <Redirect to="/not-found" />;
  }

  return <>{children}</>;
};

export const useFaction = () => {
  const { faction } = useRouter().query;

  invariant(
    faction,
    "This hook is meant to be used insied a FactionGuard component"
  );

  return faction as Faction;
};
