import classNames from "classnames";
import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { Flex } from "~/components/layout/Flex";
import { Footer } from "~/components/layout/Footer";
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

        <div className="relative min-h-screen">
          <div
            className={classNames("z-20 w-full", { "lg:fixed": headerFixed })}
          >
            <Header fluid={fluid} />
          </div>
          <div
            className={classNames("mx-auto  overflow-auto pb-10 px-5 sm:px-0", {
              container: !fluid,
              "pt-32": headerFixed,
              "pt-10": !headerFixed,
            })}
          >
            {children}
          </div>
        </div>
        <Flex
          className={classNames({
            "mx-auto lg:pl-64": headerFixed,
          })}
        >
          <Footer />
        </Flex>
      </div>
    );
  }
);
