import classNames from "classnames";
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
            height={55.8}
            width={155}
            alt={"Start Atlas Italia"}
          />
        </Flex>
      </span>
    </Link>
  );
};

type Props = { fluid?: boolean };

export const Header = ({ fluid }: Props) => (
  <Flex align="center" grow={1} py={5} px={5} justify="center">
    <Flex
      className={classNames("z-10 w-full", { container: !fluid })}
      justify="between"
    >
      <Flex lgPx={8}>
        <LogoLink />
      </Flex>

      <Flex align="center" className="space-x-3">
        <Wallet />
      </Flex>
    </Flex>
  </Flex>
);
