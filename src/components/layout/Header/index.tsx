import { useWallet } from "@solana/wallet-adapter-react";
import classNames from "classnames";
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
            height={72 * 0.9}
            width={200 * 0.9}
            alt={"Start Atlas Italia"}
          />
        </Flex>
      </span>
    </Link>
  );
};

type Props = { fluid?: boolean };

export const Header = ({ fluid }: Props) => {
  const { locale } = useRouter();
  const { connected, wallet } = useWallet();

  return (
    <Flex align="center" grow={1} py={5} px={12} justify="center">
      <Flex
        className={classNames("z-10 w-full", { container: !fluid })}
        justify="between"
      >
        <LogoLink />

        <Flex align="center" className="space-x-3">
          {wallet && connected && (
            <Link href={getRoute("/dashboard")} locale={locale}>
              <a>
                <Text color="white" weight="semibold">
                  <Translation id="Layout.Header.Dashboard.action.title" />
                </Text>
              </a>
            </Link>
          )}
          <Wallet />
        </Flex>
      </Flex>
    </Flex>
  );
};
