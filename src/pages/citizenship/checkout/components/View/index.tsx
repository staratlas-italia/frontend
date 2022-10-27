import { ShieldCheckIcon } from "@heroicons/react/outline";
import styled from "styled-components";
import { Loader as CLoader } from "~/components/common/Loader";
import { Text } from "~/components/common/Text";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Container } from "~/components/layout/Container";
import { Flex } from "~/components/layout/Flex";
import { Logo } from "~/components/layout/Header";
import { SelfRetriever } from "~/components/SelfRetriever";
import { Wallet } from "~/components/Wallet";
import { useCitizenshipPrice } from "~/hooks/useCitizenshipPrice";
import { Translation } from "~/i18n/Translation";
import { usePaymentStore } from "~/stores/usePaymentStore";
import { useFaction } from "../../../FactionGuard";
import { ReferenceRetriever } from "../ReferenceRetriever";
import { ConfirmLoader } from "./ConfirmLoader";
import { DirectlyPay } from "./DirectlyPay";
import { QrCode } from "./QrCode";

const LoaderContainer = styled(Flex)`
  width: 250px;
  height: 250px;
`;

const Loader = () => (
  <LoaderContainer
    align="center"
    className="bg-white rounded-md"
    justify="center"
  >
    <CLoader />
  </LoaderContainer>
);

const Icon = styled.img`
  object-fit: contain;
`;

const CartItem = () => {
  const faction = useFaction();

  const amount = useCitizenshipPrice();

  return (
    <Flex justify="between" className="space-x-3">
      <Flex className="w-20 h-20 rounded-md overflow-hidden">
        <Icon src={`/images/cards/card-square-${faction}.webp`} />
      </Flex>
      <Flex direction="col" grow={1}>
        <Text color="text-white" size="lg" weight="bold">
          Badge {(faction as string).toUpperCase()}
        </Text>
        <Text color="text-white" weight="bold">
          x1
        </Text>
      </Flex>
      <Flex align="center">
        <Text color="text-white">{amount} USDC</Text>
      </Flex>
    </Flex>
  );
};

export const View = () => {
  const isConfirming = usePaymentStore((s) => s.isConfirming);
  const amount = useCitizenshipPrice();

  return (
    <>
      <Container>
        <Flex direction="col" align="center" justify="center" pt={24} pb={52}>
          <BlurBackground p={8} direction="col" className="max-w-lg">
            <Flex direction="col" className="space-y-5 ">
              <Flex justify="between">
                <Flex>
                  <Logo />
                </Flex>
                <Flex>
                  <Wallet hideSettings />
                </Flex>
              </Flex>
              <Flex align="center" justify="between">
                <Text color="text-white" weight="bold" size="4xl">
                  <Translation id="citizenship.checkout.title" />
                </Text>

                {isConfirming && <ConfirmLoader />}
              </Flex>
              <Text color="text-gray-200">
                <Translation id="citizenship.checkout.subtitle" />
              </Text>

              <Flex direction="col" className="space-y-5 divide-y-2">
                <CartItem />

                <Flex pt={5} justify="between">
                  <Text color="text-white" weight="semibold">
                    <Translation id="citizenship.checkout.cart.total.label" />
                  </Text>
                  <Text color="text-white" weight="semibold">
                    {amount} USD
                  </Text>
                </Flex>
              </Flex>
            </Flex>

            <Flex pt={5} justify="center">
              <SelfRetriever loader={<Loader />}>
                <ReferenceRetriever loader={<Loader />}>
                  <QrCode />
                </ReferenceRetriever>
              </SelfRetriever>
            </Flex>

            <Flex className="space-y-5" direction="col" pt={5} justify="center">
              <Flex
                align="center"
                className="space-y-3"
                direction="col"
                pt={5}
                lgPx={8}
                justify="center"
              >
                <Text
                  align="center"
                  color="text-gray-200"
                  size="xl"
                  weight="semibold"
                >
                  <Translation id="citizenship.checkout.qrcode.hint.0" />
                </Text>

                <Flex align="center" className="space-x-2">
                  <ShieldCheckIcon className="w-6 h-6 text-gray-300" />

                  <Text size="sm" align="center" color="text-gray-300">
                    <Translation id="citizenship.checkout.qrcode.hint.1" />
                  </Text>
                </Flex>
              </Flex>

              <Flex justify="center">
                <Text size="xs" color="text-gray-200">
                  <Translation id="generic.or" />
                </Text>
              </Flex>

              <DirectlyPay />
            </Flex>
          </BlurBackground>
        </Flex>
      </Container>
    </>
  );
};
