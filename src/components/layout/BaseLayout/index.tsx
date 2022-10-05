import classNames from "classnames";
import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { Flex } from "~/components/layout/Flex";
import { Footer } from "~/components/layout/Footer";

const LayoutBackground = styled.div.attrs({
  className: "fixed bg-no-repeat bg-cover bg-center min-h-screen	w-screen",
})`
  background-image: url("/images/bg.webp");
`;

type Props = { hasSidebar?: boolean };

export const BaseLayout = React.memo(
  ({ children, hasSidebar }: PropsWithChildren<Props>) => {
    return (
      <>
        <LayoutBackground />

        <div className="relative min-h-screen">{children}</div>

        <Flex className={classNames("mx-auto", { "lg:pl-64": hasSidebar })}>
          <Footer />
        </Flex>
      </>
    );
  }
);

BaseLayout.displayName = "BaseLayout";
