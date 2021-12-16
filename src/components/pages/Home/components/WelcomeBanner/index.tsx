import { ArrowRightIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { Text } from "~/components/common/Text";
import { Button } from "~/components/controls/Button";
import { Flex } from "~/components/layout/Flex";
import { ShipImage } from "~/components/pages/Home/components/WelcomeBanner/ShipImage";

export const WelcomeBanner = () => (
  <Flex
    align="center"
    className="md:grid md:grid-cols-2"
    direction="col-reverse"
    mdDirection="row"
    justify="center"
  >
    <Flex
      color="black"
      className="space-y-5 md:rounded-3xl backdrop-filter backdrop-blur-xl bg-opacity-30"
      p={5}
      direction="col"
      justify="center"
    >
      <Text
        color="white"
        className="tracking-tight0"
        weight="extrabold"
        size="4xl"
        mdSize="6xl"
      >
        Benvenuto!
      </Text>
      <Text color="white" size="lg" mdSize="xl" weight="medium">
        Un cataclisma cosmico ha generato un tesoro di Minerali al centro della
        galassia. Le tre fazioni in lotta da millenni rivolgono ora le brame di
        conquista agli immensi tesori di Star Atlas.
      </Text>
      <Text color="white" weight="semibold" size="lg" mdSize="xl">
        Sei pronto a unirti alla gilda più grande d'Italia?
      </Text>
      <Flex>
        <Link href="/ships">
          <Button
            bgColor="indigo-500"
            hoverBgColor="indigo-600"
            iconRight={ArrowRightIcon}
            textColor="white"
          >
            Esplora le navi
          </Button>
        </Link>
      </Flex>
    </Flex>

    <Flex justify="center">
      <ShipImage />
    </Flex>
  </Flex>
);
