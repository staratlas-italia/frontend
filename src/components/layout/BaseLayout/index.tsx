import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { Header } from "~/components/layout/Header";

const BaseLayoutWrapper = styled.div.attrs({
  className: "bg-fixed bg-no-repeat bg-cover bg-center min-h-screen	w-screen",
})`
  background-image: url("/images/bg.webp");
`;

export const BaseLayout = React.memo(
  ({ children }: PropsWithChildren<unknown>) => {
    return (
      <BaseLayoutWrapper>
        <Header />
        <div className="z-30 container overflow-auto mx-auto py-10 px-5">
          {children}
        </div>
      </BaseLayoutWrapper>
    );
  }
);
