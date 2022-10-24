import { AssertAuthenticated } from "~/components/auth/AssertAuthenticated";
import { LoadingView } from "~/components/LoadingView";
import { SelfRetriever } from "~/components/SelfRetriever";
import { View } from "./components/View";

const DiscordLink = () => (
  <SelfRetriever>
    <AssertAuthenticated loader={<LoadingView />}>
      <View />
    </AssertAuthenticated>
  </SelfRetriever>
);

export default DiscordLink;
