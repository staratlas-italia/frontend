import { PublicKey } from "@solana/web3.js";
import { createIntl, createIntlCache } from "react-intl";
import { APP_BASE_URL, FLEET_WEBSITE_URL } from "~/common/constants";
import { MenuItem } from "~/components/layout/SideBarLayout/components/SideBar/types";
import { getTranslations } from "~/i18n/getTranslations";
import { appendQueryParams } from "~/utils/appendQueryParams";
import { isAdminPublicKey } from "~/utils/isAdminPublicKey";

export const getMenuItems = async (
  locale: string = "it",
  publicKey?: string
): Promise<MenuItem[]> => {
  const { default: messages } = await getTranslations(locale);

  const cache = createIntlCache();
  const intl = createIntl({ locale, messages }, cache);

  let routes: MenuItem[] = [
    {
      name: intl.formatMessage({
        id: "Layout.Sidebar.Dashboard.title",
      }),
      route: `${APP_BASE_URL}/dashboard`,
      icon: `${APP_BASE_URL}/images/icons/flask-solid.svg`,
    },
  ];

  if (publicKey && isAdminPublicKey(new PublicKey(publicKey))) {
    routes.push({
      name: intl.formatMessage({
        id: "Layout.Sidebar.Stats.title",
      }),
      route: `${APP_BASE_URL}/admin`,
      icon: `${APP_BASE_URL}/images/icons/toolbox-solid.svg`,
    });
  }

  routes = routes.concat([
    {
      name: intl.formatMessage({
        id: "Layout.Sidebar.Ships.title",
      }),
      route: `${APP_BASE_URL}/ships`,
      icon: `${APP_BASE_URL}/images/icons/rocket-solid.svg`,
    },
    {
      name: intl.formatMessage({
        id: "Layout.Sidebar.ShipsDeals.title",
      }),
      route: `${APP_BASE_URL}/ships/deals`,
      icon: `${APP_BASE_URL}/images/icons/comments-dollar-solid.svg`,
    },
  ]);

  if (publicKey) {
    routes = routes.concat([
      {
        name: intl.formatMessage({
          id: "Layout.Sidebar.FleetSim.title",
        }),
        icon: `${APP_BASE_URL}/images/icons/wrench-solid.svg`,
        route: appendQueryParams(FLEET_WEBSITE_URL, {
          view: "sim",
          pbk: publicKey,
          lang: locale,
        }),
      },
      {
        name: intl.formatMessage({
          id: "Layout.Sidebar.ScoreTool.title",
        }),
        icon: `${APP_BASE_URL}/images/icons/chart-pie-solid.svg`,
        route: appendQueryParams(FLEET_WEBSITE_URL, {
          view: "score",
          pbk: publicKey,
          lang: locale,
        }),
      },
    ]);
  }

  routes.push({
    name: intl.formatMessage({
      id: "Layout.Sidebar.Resources.title",
    }),
    icon: `${APP_BASE_URL}/images/icons/book-solid.svg`,
    route: `https://staratlasitalia.com/rubriche`,
    external: true,
  });

  return routes;
};
