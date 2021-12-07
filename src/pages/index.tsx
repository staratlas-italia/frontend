import { ArrowRightIcon } from "@heroicons/react/solid";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { HumanBanner } from "~/components/banners/HumanBanner";
import { ShipBanner } from "~/components/banners/ShipBanner";
import { Divider } from "~/components/common/Divider";
import { Text } from "~/components/common/Text";
import { Button } from "~/components/controls/Button";
import { Flex } from "~/components/layout/Flex";

const Home = () => {
  return (
    <>
      <Head>
        <title>Home - StarAtlasItalia</title>
      </Head>
      <Divider>
        <Flex
          pb={10}
          align="center"
          className="md:grid md:grid-cols-2"
          direction="col-reverse"
          mdDirection="row"
          justify="center"
        >
          <Flex className="space-y-5" direction="col" justify="center">
            <Text
              className="tracking-tight "
              weight="extrabold"
              size="4xl"
              mdSize="5xl"
            >
              Benvenuto!
            </Text>
            <Text size="lg" mdSize="xl" color="gray-500">
              Un cataclisma cosmico ha generato un tesoro di Minerali al centro
              della galassia. Le tre fazioni in lotta da millenni rivolgono ora
              le brame di conquista agli immensi tesori di Star Atlas.
            </Text>
            <Text weight="semibold" size="lg" mdSize="xl">
              Sei pronto a unirti alla gilda più grande d'Italia?
            </Text>
            <Flex pt={3}>
              <Link href="/ships">
                <Button
                  bgColor="indigo-100"
                  iconRight={ArrowRightIcon}
                  textColor="indigo-700"
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
          <Flex>
            <HumanBanner />
          </Flex>
          <Flex className="space-y-5" direction="col" pt={10}>
            <Text
              className="tracking-tight "
              weight="extrabold"
              size="4xl"
              mdSize="5xl"
            >
              Vuoi far parte della gilda?
            </Text>

            <Text size="lg" mdSize="xl" color="gray-500">
              L’ingresso nella guild Star Atlas Italia è vinFlexato al pagamento
              di una fee di ingresso che sarà destinata all’acquisto di asset
              come ship, land e token.
            </Text>
            <Text size="lg" mdSize="xl" color="gray-500">
              Introduzione di questa fee consentirà alla Gilda di avere una base
              di asset su cui poter contare. In base all’ammontare investito
              nella Guild verranno airdroppati 1 o più NFT che rappresenteranno
              le quote di partecipazione alla Gilda, avendo a tutti gli effetti
              il potere di decidere su di essa (DAO).
            </Text>

            <Flex justify="end" pt={3}>
              <Link href="https://forms.gle/Es6cb1LDu6AHbMJ38">
                <a target="_blank">
                  <Button as="span" bgColor="green-100" textColor="green-700">
                    Vuoi arruolati? - Clicca qui
                  </Button>
                </a>
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </Divider>
    </>
  );
};

export default Home;
