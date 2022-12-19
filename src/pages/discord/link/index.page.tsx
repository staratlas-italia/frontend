import { AssertAuthenticated } from "~/components/auth/AssertAuthenticated";
import { SignatureRefresher } from "~/components/auth/AssertAuthenticated/SignatureRefresher";
import { Container } from "~/components/layout/Container";
import { Flex } from "~/components/layout/Flex";
import { SelfRetriever } from "~/components/SelfRetriever";
import { View } from "./components/View";

const Fallback = () => (
  <Container>
    <Flex pt={32}>
      <SignatureRefresher />
    </Flex>
  </Container>
);

const DiscordLink = () => (
  <SelfRetriever>
    <AssertAuthenticated fallback={<Fallback />}>
      <View />
    </AssertAuthenticated>
  </SelfRetriever>
);

export default DiscordLink;
