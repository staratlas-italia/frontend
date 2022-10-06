import Link from "next/link";
import { DEV_EMAIL } from "~/common/constants";
import { Text } from "~/components/common/Text";
import { Button } from "~/components/controls/Button";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Container } from "~/components/layout/Container";
import { Flex } from "~/components/layout/Flex";
import { Translation } from "~/i18n/Translation";
import { usePaymentReference } from "~/pages/citizenship/checkout/components/View/usePaymentReference";
import { getRoute } from "~/utils/getRoute";

export const View = () => {
  const reference = usePaymentReference();

  return (
    <Container>
      <Flex direction="col" align="center" justify="center" pt={24} pb={52}>
        <BlurBackground p={8} direction="col" className="max-w-lg">
          <Text color="text-white" weight="bold" size="3xl">
            <Translation id="citizenship.checkout.error.title" />
          </Text>

          <Flex pt={10}>
            <Text align="center" color="text-gray-300" size="xs">
              <Translation id="citizenship.checkout.error.description" />

              <a
                className="text-emerald-500"
                href={`mailto:dev@staratlasitalia.com?subject=Reference ${reference}`}
                rel="noreferrer"
                target="_blank"
              >
                {DEV_EMAIL}
              </a>
            </Text>
          </Flex>

          <Flex direction="col" pt={5}>
            <Text align="center" color="text-gray-300" size="xs" weight="bold">
              <Translation id="citizenship.checkout.confirmed.reference.label" />
            </Text>

            <Text align="center" color="text-gray-300" size="xs">
              {reference}
            </Text>
          </Flex>

          <Flex direction="col" pt={10}>
            <Link href={getRoute("/dashboard")}>
              <a>
                <Button.Neutral as="div">
                  <Translation id="citizenship.checkout.confirmed.back.action.title" />
                </Button.Neutral>
              </a>
            </Link>
          </Flex>
        </BlurBackground>
      </Flex>
    </Container>
  );
};
