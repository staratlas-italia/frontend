import { BlurBackground } from "~/components/layout/BlurBackground";
import { Container } from "~/components/layout/Container";
import { Flex } from "~/components/layout/Flex";
import { Logo } from "~/components/layout/Header";
import { Wallet } from "~/components/Wallet";

export const View = () => {
  return (
    <Container>
      <Flex direction="col" align="center" justify="center" pt={52}>
        <BlurBackground p={8} className="max-w-screen-md" direction="col">
          <Flex align="center" pb={5} justify="between">
            <Flex>
              <Logo />
            </Flex>
          </Flex>

          <Flex pt={5} className="space-x-3">
            <Wallet hideSettings />
          </Flex>
        </BlurBackground>
      </Flex>
    </Container>
  );
};
