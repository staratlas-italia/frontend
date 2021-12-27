import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Flex } from "~/components/layout/Flex";
import { AtlasUsdcChange } from "~/components/layout/Header/components/AtlasUsdcChange";
import { Treasury } from "~/components/layout/Header/components/Treasury";
import { Wallet } from "~/components/Wallet";

export const LogoLink = () => {
  return (
    <Link href={`/`}>
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

export const Header = () => (
  <Flex align="center" grow={1} py={4} px={10} justify="center">
    <Flex className="container" justify="between">
      <LogoLink />

      <Flex className="hidden">
        <Wallet />
      </Flex>
      <Flex className="z-40 space-x-7">
        <AtlasUsdcChange />
        <Treasury />
      </Flex>
    </Flex>
  </Flex>
);
