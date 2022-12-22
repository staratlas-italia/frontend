import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Flex } from "~/components/layout/Flex";
import { Wallet } from "~/components/Wallet";
import { NewsButton } from "./components/NewsButton";

export const Logo = () => (
  <Image
    priority
    src="/images/logo.webp"
    height={55.8}
    width={155}
    alt={"Start Atlas Italia"}
  />
);

export const LogoLink = () => {
  const { locale } = useRouter();
  return (
    <Link href="/" locale={locale}>
      <span className="cursor-pointer">
        <Flex align="center">
          <Logo />
        </Flex>
      </span>
    </Link>
  );
};

type Props = { fluid?: boolean; fixed?: boolean };

export const Header = ({ fluid, fixed }: Props) => (
  <div
    className={classNames("z-20 w-full pb-10", {
      "lg:fixed": fixed,
    })}
  >
    <Flex align="center" grow={1} py={5} px={5} justify="center">
      <Flex
        className={classNames("z-10 w-full", { container: !fluid })}
        justify="between"
      >
        <Flex lgPx={8}>
          <LogoLink />
        </Flex>

        <Flex align="center" className="space-x-3">
          <NewsButton />

          <Wallet />
        </Flex>
      </Flex>
    </Flex>
  </div>
);
