import { BeakerIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { Text } from "~/components/common/Text";
import { Flex } from "~/components/layout/Flex";
import { MenuItem } from "~/components/layout/SideBarLayout/components/SideBar/types";

const menuItems: MenuItem[] = [
  {
    name: "Dashboard",
    route: "/dashboard",
    icon: (props) => <BeakerIcon {...props} />,
  },
  {
    name: "The ships",
    route: "/ships",
    icon: (props) => <img src={`/images/icons/rocket-solid.svg`} {...props} />,
  },
  {
    name: "Score Tool",
    icon: (props) => (
      <img src={`/images/icons/chart-pie-solid.svg`} {...props} />
    ),
  },
  {
    name: "Resources",
    icon: (props) => <img src={`/images/icons/book-solid.svg`} {...props} />,
    route: "https://staratlasitalia.com/la-strada-verso-linfinito/",
    external: true,
  },
];

export const Content = () => (
  <Flex direction="col" className="space-y-6" pb={20} px={8}>
    {menuItems.map((item, index) => (
      <Flex key={index.toString()}>
        <Link href={item.route || ""}>
          <a target={item.external ? "_blank" : undefined}>
            <Flex
              align="center"
              px={4}
              py={2}
              className="space-x-6 hover:bg-gray-200 hover:bg-opacity-10 rounded-3xl"
            >
              {item.icon({ className: "h-5 w-5 text-white" })}
              <Text color="white" weight="medium">
                {item.name}
              </Text>
            </Flex>
          </a>
        </Link>
      </Flex>
    ))}
  </Flex>
);
