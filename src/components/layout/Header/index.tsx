import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Flex } from "~/components/layout/Flex";
import { Wallet } from "~/components/Wallet";

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
  return (
    <Flex align="center" grow={1} py={4} px={10} justify="center">
      <Flex className="container" justify="between">
        <LogoLink />

        <Flex className="z-10">
          <Wallet />
        </Flex>
        {/* <Flex className="z-40 space-x-7">
          <AtlasUsdcChange />
          <Treasury />

          <Link href={asPath} locale={locale === "it" ? "en" : "it"}>
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
        </Flex> */}
      </Flex>
    </Flex>
  );
};
