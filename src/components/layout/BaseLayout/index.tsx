import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { Header } from "~/components/layout/Header";

const LayoutBackground = styled.div.attrs({
  className: "fixed bg-no-repeat bg-cover bg-center min-h-screen	w-screen",
})`
  background-image: url("/images/bg.webp");
`;

export const BaseLayout = React.memo(
  ({ children }: PropsWithChildren<unknown>) => {
    return (
      <div>
        <LayoutBackground />
        <Header />
        <div className="container overflow-auto mx-auto py-10">{children}</div>
      </div>
    );
  }
);
