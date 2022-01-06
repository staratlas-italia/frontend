import Link from "next/link";
import { Text } from "~/components/common/Text";
import { Flex } from "~/components/layout/Flex";
import { MenuItem } from "~/components/layout/SideBarLayout/components/SideBar/types";

const menuItems: MenuItem[] = [
  {
    name: "Profile",
  },
  {
    name: "Ships",
    route: "/ships",
  },
  {
    name: "Fleet",
  },
  {
    name: "Create fleet",
  },
];

export const Content = () => (
  <Flex direction="col" className="space-y-5" pb={20}>
    {menuItems.map((item, index) => (
      <Flex key={index.toString()} justify="center">
        <Link href={item.route || ""}>
          <a>
            <Text color="white" transform="uppercase" weight="semibold">
              {item.name}
            </Text>
          </a>
        </Link>
      </Flex>
    ))}
  </Flex>
);
