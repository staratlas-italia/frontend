import { ArrowRightIcon } from "@heroicons/react/solid";
import { useWallet } from "@solana/wallet-adapter-react";
import classNames from "classnames";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Text } from "~/components/common/Text";
import { Button } from "~/components/controls/Button";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Container } from "~/components/layout/Container";
import { Flex } from "~/components/layout/Flex";
import { Logo } from "~/components/layout/Header";
import { LinkDiscordButton } from "~/components/LinkDiscordButton";
import { LocaleSelector } from "~/components/LocaleSelector";
import { SelfRetriever } from "~/components/SelfRetriever";
import { useSwapStateAccount } from "~/components/SwapStateAccountGuard";
import { Wallet } from "~/components/Wallet";
import { Translation } from "~/i18n/Translation";
import { appendQueryParams } from "~/utils/appendQueryParams";
import { fillUrlParameters } from "~/utils/fillUrlParameters";
import { getRoute } from "~/utils/getRoute";

const ImageContainer = styled.div`
  width: 100%;

  min-width: 280px;
  max-width: 280px;
`;

export const View = () => {
  const { connected } = useWallet();

  const router = useRouter();

  const { cluster } = router.query;

  const { swapAccount, image, sections, discounted, size } =
    useSwapStateAccount();

  return (
    <>
      <Head>
        <title>Swap - StarAtlasItalia</title>
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

            <Flex direction="col" pb={10} mdPb={5}>
              <Flex>
                <Text color="text-gray-200" weight="bold">
                  <Translation id="swap.intro.hint" />
                </Text>
              </Flex>
              <Flex pt={3} className="space-x-3">
                <Wallet />
              </Flex>
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
                    <Translation id={sections.intro.title} />{" "}
                    {size && <>{size}</>}
                  </Text>
                  <Text color="text-gray-200">
                    <Translation id={sections.intro.description} />
                  </Text>
                </Flex>
              </Flex>

              <Flex align="center" justify="center">
                <ImageContainer>
                  <img
                    alt="Citizenship card"
                    className="rotate-12"
                    src={image.normal}
                  />
                </ImageContainer>
              </Flex>
            </Flex>

            <Flex direction="col" pt={5}>
              {discounted && (
                <Flex className="md:w-2/3">
                  <Text color="text-gray-200" weight="bold">
                    <Translation id="swap.intro.discord" />
                  </Text>
                </Flex>
              )}

              <Flex pt={discounted ? 3 : 0} justify="between">
                {discounted && (
                  <SelfRetriever loader={<LinkDiscordButton.Loader />}>
                    <LinkDiscordButton />
                  </SelfRetriever>
                )}

                <Link
                  className={classNames({
                    "pointer-events-none": !connected,
                  })}
                  href={
                    connected
                      ? appendQueryParams(
                          fillUrlParameters(
                            getRoute("/swap/:swapAccount/checkout"),
                            { swapAccount: swapAccount.toString() }
                          ),
                          (cluster ? { cluster } : {}) as Record<string, any>
                        )
                      : "#"
                  }
                  passHref
                >
                  <Button
                    as="div"
                    className="cursor-pointer"
                    disabled={!connected}
                    kind="neutral"
                    iconRight={ArrowRightIcon}
                  >
                    <Translation id="generic.next" />
                  </Button>
                </Link>
              </Flex>
            </Flex>
          </BlurBackground>
        </Flex>
      </Container>
    </>
  );
};
