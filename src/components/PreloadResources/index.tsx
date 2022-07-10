import { ResourcesRetriever } from "~/components/ResourcesRetriever";
import { useNullableSelf } from "~/hooks/useNullableSelf";

export const PreloadResources = () => {
  const { isFetching } = useNullableSelf();

  if (isFetching) {
    return null;
  }

  return <ResourcesRetriever />;
};
