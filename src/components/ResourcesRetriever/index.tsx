import { useNullableBadges } from "~/hooks/useNullableBadges";
import { useNullableFleet } from "~/hooks/useNullableFleet";
import { useNullableSelf } from "~/hooks/useNullableSelf";

export const ResourcesRetriever = () => {
  useNullableSelf();
  useNullableFleet();
  useNullableBadges();

  return null;
};
