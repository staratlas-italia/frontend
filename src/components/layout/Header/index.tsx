import Image from "next/image";
import Link from "next/link";
import React from "react";
import { InfoRow } from "~/components/common/Info";
import { Price } from "~/components/common/Price";
import { Flex } from "~/components/layout/Flex";
import { Wallet } from "~/components/Wallet";
import { useGuildTreasury } from "~/hooks/useGuildTreasury";

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

export const Header = () => {
  const { usdcAmount } = useGuildTreasury();

  return (
    <Flex align="center" grow={1} py={4} px={10} justify="center">
      <Flex className="container" justify="between">
        <LogoLink />

        <Flex className="hidden">
          <Wallet />
        </Flex>
        {!!usdcAmount && (
          <Flex className="z-40">
            <InfoRow title="Valore tesoreria">
              <Price color="white" value={usdcAmount} currency="USDC" />
            </InfoRow>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
