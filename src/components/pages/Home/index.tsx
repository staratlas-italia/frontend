import { ArrowRightIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { Text } from "~/components/common/Text";
import { Button } from "~/components/controls/Button";
import { Flex } from "~/components/layout/Flex";
import { HumanBanner } from "./components/HumanBanner";
import { ShipBanner } from "./components/ShipBanner";

export const HomePage = () => (
  <div className="space-y-10">
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
          Un cataclisma cosmico ha generato un tesoro di Minerali al centro
          della galassia. Le tre fazioni in lotta da millenni rivolgono ora le
          brame di conquista agli immensi tesori di Star Atlas.
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
        <ShipBanner />
      </Flex>
    </Flex>

    <Flex
      align="center"
      className="md:grid md:grid-cols-2"
      direction="col"
      mdDirection="row"
      justify="center"
    >
      <Flex justify="center">
        <HumanBanner />
      </Flex>
      <Flex
        color="black"
        className="space-y-5 md:rounded-3xl backdrop-filter backdrop-blur-xl bg-opacity-20"
        direction="col"
        py={5}
        px={8}
      >
        <Text
          color="white"
          className="tracking-tight "
          weight="extrabold"
          size="4xl"
          mdSize="6xl"
        >
          Vuoi far parte della gilda?
        </Text>

        <Text size="lg" mdSize="xl" color="gray-200">
          L’ingresso nella guild Star Atlas Italia è vincolato al pagamento di
          una fee di ingresso che sarà destinata all’acquisto di asset come
          ship, land e token.
        </Text>
        <Text size="lg" mdSize="xl" color="gray-200">
          Introduzione di questa fee consentirà alla Gilda di avere una base di
          asset su cui poter contare. In base all’ammontare investito nella
          Guild verranno airdroppati 1 o più NFT che rappresenteranno le quote
          di partecipazione alla Gilda, avendo a tutti gli effetti il potere di
          decidere su di essa (DAO).
        </Text>

        <Flex justify="end" pt={3}>
          <Link href="https://forms.gle/Es6cb1LDu6AHbMJ38">
            <a target="_blank">
              <Button
                as="span"
                bgColor="green-100"
                hoverBgColor="green-200"
                textColor="green-700"
              >
                Vuoi arruolati? - Clicca qui
              </Button>
            </a>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  </div>
);
