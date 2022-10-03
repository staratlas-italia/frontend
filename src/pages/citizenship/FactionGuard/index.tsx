import invariant from "invariant";
import { PropsWithChildren } from "react";
import { Redirect } from "~/components/common/Redirect";
import { usePaymentStore } from "~/stores/usePaymentStore";
import { Faction } from "~/types";
import { getRoute } from "~/utils/getRoute";
import { isValidFaction } from "~/utils/isFaction";

export const FactionGuard = ({ children }: PropsWithChildren<unknown>) => {
  const faction = usePaymentStore((s) => s.faction);

  if (!isValidFaction(faction as string)) {
    return <Redirect replace to={getRoute("/citizenship")} />;
  }

  return <>{children}</>;
};

export const useFaction = () => {
  const faction = usePaymentStore((s) => s.faction);

  invariant(
    faction,
    "This hook is meant to be used insied a FactionGuard component"
  );

  return faction as Faction;
};
