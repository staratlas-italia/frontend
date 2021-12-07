import React, { PropsWithChildren } from "react";
import { Header } from "~/components/layout/Header";

export const BaseLayout = React.memo(
  ({ children }: PropsWithChildren<unknown>) => {
    return (
      <div>
        <Header />

        <div className="container overflow-auto mx-auto py-5">{children}</div>
      </div>
    );
  }
);
