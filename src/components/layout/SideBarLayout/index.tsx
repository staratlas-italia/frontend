import React, { PropsWithChildren } from "react";
import { Text } from "~/components/common/Text";
import { BaseLayout } from "~/components/layout/BaseLayout";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Flex } from "~/components/layout/Flex";
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
      lgP={5}
      className="invisible mt-14 lg:visible w-0 lg:w-1/4 xl:w-1/6 bg-white"
      direction="col"
    >
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
      <BaseLayout>
        <Flex>
          <SideBar />
          <div className="container lg:px-5">{children}</div>
        </Flex>
      </BaseLayout>
    );
  }
);
