import { useWallet } from "@solana/wallet-adapter-react";
import classNames from "classnames";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";
import { Text } from "~/components/common/Text";
import { Button } from "~/components/controls/Button";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Container } from "~/components/layout/Container";
import { Flex } from "~/components/layout/Flex";
import { Logo } from "~/components/layout/Header";
import { LocaleSelector } from "~/components/LocaleSelector";
import { Wallet } from "~/components/Wallet";
import { Translation } from "~/i18n/Translation";
import { usePaymentStore } from "~/stores/usePaymentStore";
import { Faction } from "~/types";
import { appendQueryParams } from "~/utils/appendQueryParams";
import { getRoute } from "~/utils/getRoute";
import { isValidFaction } from "~/utils/isFaction";

const ImageContainer = styled.div`
  width: 100%;

  min-width: 280px;
  max-width: 280px;
`;

const Citizenship = () => {
  const { connected } = useWallet();

  const router = useRouter();

  const { faction, cluster } = router.query;

  useEffect(() => {
    if (!isValidFaction(faction as string)) {
      router.replace(getRoute("/citizenship"));

      return;
    }

    usePaymentStore.setState({
      faction: (faction as string).toUpperCase() as Faction,
    });
  }, [faction, router]);

  return (
    <>
      <Head>
        <title>Citizenship - StarAtlasItalia</title>
      </Head>

      <Container>
        <Flex direction="col" align="center" justify="center" pt={52}>
          <BlurBackground p={8} className="max-w-screen-md" direction="col">
            <Flex align="center" pb={5} justify="between">
              <Flex>
                <Logo />
              </Flex>

              <LocaleSelector />
            </Flex>
            <Flex direction="col-reverse" mdDirection="row">
              <Flex>
                <Flex
                  direction="col"
                  className="space-y-4 mr-5 lg:mr-5"
                  pt={10}
                  lgPt={0}
                >
                  <Text size="4xl" weight="bold" color="text-white">
                    <Translation id="citizenship.intro.title" />
                  </Text>
                  <Text color="text-gray-200">
                    <Translation id="citizenship.intro.description" />
                  </Text>
                  <Text color="text-gray-200" weight="bold">
                    <Translation id="citizenship.intro.hint" />
                  </Text>
                </Flex>
              </Flex>

              <Flex align="center" justify="center">
                <ImageContainer>
                  <img
                    className="rotate-12"
                    alt="Citizenship card"
                    src={`/images/cards/card-${faction}.webp`}
                  />
                </ImageContainer>
              </Flex>
            </Flex>

            <Flex pt={5} className="space-x-3">
              <Wallet />

              <Link
                href={
                  connected
                    ? appendQueryParams(
                        getRoute("/citizenship/checkout"),
                        (cluster ? { cluster } : {}) as Record<string, any>
                      )
                    : "#"
                }
                passHref
              >
                <a
                  className={classNames({ "pointer-events-none": !connected })}
                >
                  <Button.Neutral
                    as="div"
                    className="cursor-pointer"
                    disabled={!connected}
                    size="small"
                  >
                    <Translation id="generic.next" />
                  </Button.Neutral>
                </a>
              </Link>
            </Flex>
          </BlurBackground>
        </Flex>
      </Container>
    </>
  );
};

export default Citizenship;
