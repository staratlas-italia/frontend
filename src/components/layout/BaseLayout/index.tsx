import classNames from "classnames";
import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { Header } from "~/components/layout/Header";

const LayoutBackground = styled.div.attrs({
  className: "fixed bg-no-repeat bg-cover bg-center min-h-screen	w-screen",
})`
  background-image: url("/images/bg.webp");
`;

type Props = { fluid?: boolean; hideHeader?: boolean };

export const BaseLayout = React.memo(
  ({ children, fluid, hideHeader }: PropsWithChildren<Props>) => {
    return (
      <div>
        <LayoutBackground />
        {!hideHeader && <Header />}
        <div
          className={classNames("overflow-auto mx-auto py-10", {
            container: !fluid,
          })}
        >
          {children}
        </div>
      </div>
    );
  }
);
