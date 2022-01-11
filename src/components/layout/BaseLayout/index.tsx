import classNames from "classnames";
import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { Header } from "~/components/layout/Header";

const LayoutBackground = styled.div.attrs({
  className: "fixed bg-no-repeat bg-cover bg-center min-h-screen	w-screen",
})`
  background-image: url("/images/bg.webp");
`;

type Props = { fluid?: boolean; headerFixed?: boolean };

export const BaseLayout = React.memo(
  ({ children, fluid, headerFixed }: PropsWithChildren<Props>) => {
    return (
      <div>
        <LayoutBackground />

        <div className={classNames("z-10 w-full", { fixed: headerFixed })}>
          <Header fluid={fluid} />
        </div>
        <div
          className={classNames("overflow-auto mx-auto  pb-10 px-5 sm:px-0", {
            container: !fluid,
            "pt-32": headerFixed,
            "pt-10": !headerFixed,
          })}
        >
          {children}
        </div>
      </div>
    );
  }
);
