import { useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { DEV_EMAIL } from "~/common/constants";
import { Text } from "~/components/common/Text";
import { Button } from "~/components/controls/Button";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Container } from "~/components/layout/Container";
import { Flex } from "~/components/layout/Flex";
import { Translation } from "~/i18n/Translation";
import { TranslationId } from "~/i18n/translations/types";
import { getRoute } from "~/utils/getRoute";

export const View = () => {
  const { publicKey } = useWallet();

  const { query } = useRouter();

  const translation: TranslationId = useMemo(() => {
    const code = query.code as string;

    switch (code) {
      case "NotEnoughFunds":
        return "swap.checkout.error.description.notEnoughFunds";
      default:
        return "swap.checkout.error.description";
    }
  }, [query]);

  return (
    <Container>
      <Flex direction="col" align="center" justify="center" pt={24} pb={52}>
        <BlurBackground p={8} direction="col" className="max-w-lg">
          <Text color="text-white" weight="bold" size="3xl">
            <Translation id="citizenship.checkout.error.title" />
          </Text>

          <Flex pt={10}>
            <Text align="center" color="text-gray-300" size="lg">
              <Translation id={translation} />

              {translation === "swap.checkout.error.description" && (
                <a
                  className="text-emerald-500"
                  href={`mailto:dev@staratlasitalia.com?subject=User ${publicKey?.toString()}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  {DEV_EMAIL}
                </a>
              )}
            </Text>
          </Flex>

          <Flex direction="col" pt={10}>
            <Link replace href={getRoute("/dashboard")}>
              <Button kind="neutral" as="div">
                <Translation id="swap.checkout.confirmed.back.action.title" />
              </Button>
            </Link>
          </Flex>
        </BlurBackground>
      </Flex>
    </Container>
  );
};
