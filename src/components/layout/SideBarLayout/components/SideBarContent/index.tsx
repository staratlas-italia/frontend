import { BeakerIcon, ChartPieIcon } from "@heroicons/react/solid";
import { useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Text } from "~/components/common/Text";
import { Flex } from "~/components/layout/Flex";
import { MenuItem } from "~/components/layout/SideBarLayout/components/SideBar/types";
import { Translation } from "~/i18n/Translation";
import { useAuthStore } from "~/stores/useAuthStore";

const menuItems: MenuItem[] = [
  {
    name: "Layout.Sidebar.Dashboard.title",
    route: "/dashboard",
    icon: (props) => <BeakerIcon {...props} />,
  },
  {
    adminOnly: true,
    name: "Layout.Sidebar.Stats.title",
    route: "/admin",
    icon: (props) => <img src={`/images/icons/toolbox-solid.svg`} {...props} />,
  },
  {
    name: "Layout.Sidebar.Ships.title",
    route: "/ships",
    icon: (props) => <img src={`/images/icons/rocket-solid.svg`} {...props} />,
  },
  {
    name: "Layout.Sidebar.ShipsDeals.title",
    route: "/ships/deals",
    icon: (props) => <ChartPieIcon {...props} />,
  },
  {
    name: "Layout.Sidebar.FleetSim.title",
    icon: (props) => <img src={`/images/icons/wrench-solid.svg`} {...props} />,
    needPbk: true,
    route: "https://fleet.staratlasitalia.com?view=sim",
  },
  {
    name: "Layout.Sidebar.ScoreTool.title",
    icon: (props) => (
      <img src={`/images/icons/chart-pie-solid.svg`} {...props} />
    ),
    needPbk: true,
    route: "https://fleet.staratlasitalia.com?view=score",
  },
  {
    name: "Layout.Sidebar.Resources.title",
    icon: (props) => <img src={`/images/icons/book-solid.svg`} {...props} />,
    route: "https://staratlasitalia.com/rubriche",
    external: true,
  },
];

export const SideBarContent = () => {
  const { publicKey } = useWallet();
  const { locale } = useRouter();
  const isAdmin = useAuthStore((s) => s.isAdmin);

  return (
    <Flex
      className="lg:space-y-6 grid grid-cols-2 lg:grid-cols-none"
      lgAlign="start"
      justify="center"
      mdJustify="start"
      lgDirection="col"
      lgPx={5}
    >
      {menuItems.map((item, index) =>
        (item.needPbk && !publicKey) ||
        (!isAdmin(publicKey) && item.adminOnly) ? null : (
          <Flex key={index.toString()} align="center">
            <Link
              href={
                item.needPbk
                  ? item.route + `&pbk=${publicKey?.toString()}&lang=${locale}`
                  : item.route || ""
              }
            >
              <a target={item.external ? "_blank" : undefined}>
                <Flex
                  align="center"
                  px={4}
                  py={2}
                  className="space-x-3 lg:space-x-6 hover:bg-gray-200 hover:bg-opacity-10 rounded-3xl"
                >
                  {item.icon({ className: "h-5 w-5 text-white" })}
                  <Text color="white" size="base" weight="medium">
                    <Translation id={item.name} />
                  </Text>
                </Flex>
              </a>
            </Link>
          </Flex>
        )
      )}
    </Flex>
  );
};
