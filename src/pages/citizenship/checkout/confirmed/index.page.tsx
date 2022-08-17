import { CheckCircleIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import Confetti from "react-dom-confetti";
import styled from "styled-components";
import { Text } from "~/components/common/Text";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Container } from "~/components/layout/Container";
import { Flex } from "~/components/layout/Flex";
import { Logo } from "~/components/layout/Header";
import { SelfRetriever } from "~/components/SelfRetriever";
import { usePaymentReference } from "~/pages/citizenship/checkout/components/View/usePaymentReference";
import { FactionGuard, useFaction } from "../../FactionGuard";
import { ReferenceRetriever } from "../components/ReferenceRetriever";
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

const CitizenshipConfirmedComponent = () => {
  const faction = useFaction();
  const reference = usePaymentReference();

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
                    src={`/images/cards/card-${faction}.webp`}
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
                Congratulazioni! L’acquisto è stato completato con successo.
              </Text>
              <Text align="center" color="text-gray-200">
                Ecco il tuo badge, a breve lo vedrai nel tuo wallet.
              </Text>
              <Text align="center" color="text-gray-300" size="xs">
                Se non dovessi ricevere il badge entro le prossime 2 ore,
                contattaci a{" "}
                <a
                  className="text-emerald-500"
                  href={`mailto:dev@staratlasitalia.com?subject=Reference ${reference}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  dev@staratlasitalia.com
                </a>
                . Ti consigliamo di memorizzare temporanemanete il codice
                seguente, in caso di errori ci aiuterà a sistemare il problema
                più in fretta.
              </Text>

              <Flex direction="col">
                <Text
                  align="center"
                  color="text-gray-300"
                  size="xs"
                  weight="bold"
                >
                  Reference Code
                </Text>
                <Text align="center" color="text-gray-300" size="xs">
                  {reference}
                </Text>
              </Flex>
            </Flex>
            <Flex direction="col" pt={10}>
              <TransactionDetails />
            </Flex>
          </BlurBackground>
        </Flex>
      </Container>
    </>
  );
};

const CitizenshipConfirmed = () => (
  <FactionGuard>
    <SelfRetriever>
      <ReferenceRetriever>
        <CitizenshipConfirmedComponent />
      </ReferenceRetriever>
    </SelfRetriever>
  </FactionGuard>
);

export default CitizenshipConfirmed;
