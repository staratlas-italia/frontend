import { CheckCircleIcon } from "@heroicons/react/solid";
import { useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Confetti from "react-dom-confetti";
import styled from "styled-components";
import { DEV_EMAIL } from "~/common/constants";
import { Text } from "~/components/common/Text";
import { Button } from "~/components/controls/Button";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Container } from "~/components/layout/Container";
import { Flex } from "~/components/layout/Flex";
import { Logo } from "~/components/layout/Header";
import { useSwapStateAccount } from "~/components/SwapStateAccountGuard";
import { Translation } from "~/i18n/Translation";
import { getRoute } from "~/utils/getRoute";
import { TransactionDetails } from "./TransactionDetails";

const confettiConfig = {
  angle: 90,
  spread: 100,
  startVelocity: 34,
  elementCount: 81,
  dragFriction: 0.11,
  duration: 3000,
  stagger: 3,
  width: "10px",
  height: "10px",
};

const ImageContainer = styled.div`
  min-width: 250px;
  width: 100%;
  padding: 24px;
`;

export const View = () => {
  const { publicKey } = useWallet();
  const { image, sections } = useSwapStateAccount();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedImagePath = useMemo(() => image.normal, []);

  const [done, setDone] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setDone(true), 600);

    return () => {
      clearTimeout(timeout);
    };
  }, [setDone]);

  return (
    <>
      <Container>
        <Flex direction="col" align="center" justify="center" pt={52}>
          <BlurBackground p={8} direction="col" className="max-w-lg">
            <Flex direction="col" className="space-y-5 ">
              <Flex>
                <Logo />
              </Flex>

              <Flex
                align="center"
                className="relative"
                justify="center"
                px={16}
              >
                <div className="absolute">
                  <Confetti active={done} config={confettiConfig} />
                </div>

                <ImageContainer>
                  <img
                    className="rotate-12"
                    alt="citizen-card"
                    src={memoizedImagePath}
                  />
                </ImageContainer>

                <div className="absolute top-8 right-16">
                  <CheckCircleIcon className="h-16 w-16 text-emerald-400" />
                </div>
              </Flex>

              <Text
                align="center"
                color="text-white"
                weight="semibold"
                size="xl"
              >
                <Translation id="citizenship.checkout.confirmed.title" />
              </Text>

              <Text align="center" color="text-gray-200">
                <Translation id={sections.confirmed.description} />
              </Text>

              <Text align="center" color="text-gray-300" size="xs">
                <Translation id="swap.checkout.confirmed.description" />

                <a
                  className="text-emerald-500"
                  href={`mailto:dev@staratlasitalia.com?subject=User ${publicKey?.toString()}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  {DEV_EMAIL}
                </a>
              </Text>
            </Flex>

            <Flex direction="col" pt={10}>
              <TransactionDetails />
            </Flex>

            <Flex direction="col" pt={5}>
              <Link replace href={getRoute("/dashboard")}>
                <Button kind="neutral" as="div">
                  <Translation id="swap.checkout.confirmed.back.action.title" />
                </Button>
              </Link>
            </Flex>
          </BlurBackground>
        </Flex>
      </Container>
    </>
  );
};
