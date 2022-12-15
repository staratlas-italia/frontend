import { useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Text } from "~/components/common/Text";
import { Flex } from "~/components/layout/Flex";
import { appendQueryParams } from "~/utils/appendQueryParams";
import { MenuItem } from "../SideBar/types";
import { getMenuItems } from "./getMenuItems";

export const SideBarContent = () => {
  const { publicKey } = useWallet();
  const { locale, query } = useRouter();

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const run = async () => {
      const items = await getMenuItems(locale!, publicKey?.toString());

      setMenuItems(items);
    };

    run();
  }, [publicKey, locale]);

  return (
    <Flex
      className="lg:space-y-6 grid grid-cols-2 lg:grid-cols-none"
      lgAlign="start"
      justify="center"
      mdJustify="start"
      lgDirection="col"
      lgPx={5}
    >
      {menuItems.map((item, index) => (
        <Flex key={index.toString()} align="center">
          <Link
            href={appendQueryParams(
              item.route,
              query as Record<string, string | number>
            )}
            target={item.external ? "_blank" : undefined}
          >
            <Flex
              align="center"
              px={4}
              py={2}
              className="space-x-3 lg:space-x-6 hover:bg-gray-200 hover:bg-opacity-10 rounded-3xl"
            >
              <img src={item.icon} className="h-5 w-5 text-white" />

              <Text color="text-white" size="base" weight="medium">
                {item.name}
              </Text>
            </Flex>
          </Link>
        </Flex>
      ))}
    </Flex>
  );
};
