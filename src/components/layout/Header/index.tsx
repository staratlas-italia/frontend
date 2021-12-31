import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Text } from "~/components/common/Text";
import { Flex } from "~/components/layout/Flex";
import { Wallet } from "~/components/Wallet";
import { Translation } from "~/i18n/Translation";
import { getRoute } from "~/utils/getRoute";

export const LogoLink = () => {
  const { locale } = useRouter();
  return (
    <Link href={`/`} locale={locale}>
      <span className="cursor-pointer">
        <Flex align="center">
          <Image
            priority
            src="/images/logo.png"
            height={72 * 0.7}
            width={200 * 0.7}
            alt={"Start Atlas Italia"}
          />
        </Flex>
      </span>
    </Link>
  );
};

export const Header = () => {
  const { locale, asPath } = useRouter();
  const { connected, wallet } = useWallet();
  return (
    <Flex align="center" grow={1} py={4} px={10} justify="center">
      <Flex className="container" justify="between">
        <LogoLink />

        {wallet && connected && (
          <Link href={getRoute("/dashboard")} locale={locale}>
            <a>
              <Text color="white" weight="semibold">
                <Translation id="Layout.Header.Dashboard.action.title" />
              </Text>
            </a>
          </Link>
        )}
        <Flex className="z-10">
          <Wallet />
        </Flex>

        {/* <Link href={asPath} locale={locale === "it" ? "en" : "it"}>
            <Text
              as="a"
              color="white"
              size="5xl"
              transform="uppercase"
              weight="semibold"
            >
              {locale}
            </Text>
          </Link>
          */}
      </Flex>
    </Flex>
  );
};
