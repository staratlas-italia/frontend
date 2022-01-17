import React, { PropsWithChildren } from "react";
import { BaseLayout } from "~/components/layout/BaseLayout";
import { SideBar } from "~/components/layout/SideBarLayout/components/SideBar";

export const SideBarLayout = React.memo(
  ({ children }: PropsWithChildren<unknown>) => {
    return (
      <>
        <SideBar />
        <BaseLayout headerFixed fluid>
          <div className="container lg:px-5 lg:pl-80 mx-auto pb-32 sm:pb-28 lg:pb-0">
            {children}
          </div>
        </BaseLayout>
      </>
    );
  }
);
