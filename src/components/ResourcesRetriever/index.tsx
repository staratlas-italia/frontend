import { useNullableBadges } from "~/hooks/useNullableBadges";
import { useNullableFleet } from "~/hooks/useNullableFleet";

export const ResourcesRetriever = () => {
  useNullableFleet();
  useNullableBadges();

  return null;
};
