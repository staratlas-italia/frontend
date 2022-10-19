import { ResourcesRetriever } from "~/components/ResourcesRetriever";
import { SelfRetriever } from "~/components/SelfRetriever";

export const PreloadResources = () => (
  <SelfRetriever>
    <ResourcesRetriever />
  </SelfRetriever>
);
