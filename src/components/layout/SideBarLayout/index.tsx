import React, { PropsWithChildren } from "react";
import { Text } from "~/components/common/Text";
import { BaseLayout } from "~/components/layout/BaseLayout";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Flex } from "~/components/layout/Flex";
import { LogoLink } from "~/components/layout/Header";
import { Routes } from "~/utils/getRoute";

type MenuItem = {
  name: string;
  route?: Routes;
};
const menuItems: MenuItem[] = [
  {
    name: "Profile",
  },
  {
    name: "Fleet",
  },
  {
    name: "Create fleet",
  },
];

const SideBar = () => {
  return (
    <BlurBackground
      p={5}
      className="invisible lg:visible w-0 lg:w-1/4 z-40 bg-white"
      direction="col"
    >
      <LogoLink />
      <Flex py={10} direction="col" className="space-y-5">
        {menuItems.map((item) => (
          <Flex>
            <Text color="white" transform="uppercase" weight="semibold">
              {item.name}
            </Text>
          </Flex>
        ))}
      </Flex>
    </BlurBackground>
  );
};

export const SideBarLayout = React.memo(
  ({ children }: PropsWithChildren<unknown>) => {
    return (
      <BaseLayout hideHeader>
        <Flex>
          <SideBar />
          <div className="container lg:px-5">{children}</div>
        </Flex>
      </BaseLayout>
    );
  }
);
