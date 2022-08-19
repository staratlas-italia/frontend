import Link from "next/link";
import { Text } from "~/components/common/Text";
import { Button } from "~/components/controls/Button";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Flex } from "~/components/layout/Flex";

export const CreatePlayerBanner = () => {
  return (
    <BlurBackground align="center" className="space-y-5" direction="col" p={5}>
      <Flex align="center" direction="col">
        <Text color="text-white" size="2xl">
          Sembra che il tuo wallet
        </Text>
        <Text color="text-white" size="2xl">
          non corrisponda a un giocatore StarAtlas
        </Text>
      </Flex>
      <Flex>
        <Link href="https://play.staratlas.com/faction">
          <a target="_blank" rel="noopener">
            <Button.Neutral as="div" size="small">
              Creane uno!
            </Button.Neutral>
          </a>
        </Link>
      </Flex>
    </BlurBackground>
  );
};
