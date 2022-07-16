import { useRouter } from "next/router";
import { useMemo } from "react";
import { BaseLayout } from "~/components/layout/BaseLayout";
import { SideBarLayout } from "~/components/layout/SideBarLayout";
import { Routes } from "~/utils/getRoute";

export const MainLayout = ({ children }) => {
  const { pathname } = useRouter();

  const route = pathname as Routes;

  const Layout = useMemo(() => {
    switch (route) {
      case "/admin":
      case "/dashboard":
      case "/ships":
      case "/ships/deals":
        return SideBarLayout;
      default:
        return BaseLayout;
    }
  }, [route]);

  return <Layout>{children}</Layout>;
};
