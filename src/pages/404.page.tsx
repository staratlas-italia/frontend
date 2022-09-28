import Head from "next/head";
import { Text } from "~/components/common/Text";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Container } from "~/components/layout/Container";
import { Flex } from "~/components/layout/Flex";

const NotFoundPage = () => (
  <>
    <Head>
      <title>Oops - StarAtlasItalia</title>
    </Head>

    <Container>
      <Flex direction="col" pt={40}>
        <BlurBackground p={3}>
          <Text color="text-white">Not found</Text>
        </BlurBackground>
      </Flex>
    </Container>
  </>
);

export default NotFoundPage;
