import { Layout } from "antd";
import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { AppBar } from "../AppBar";

const { Header, Content } = Layout;

export const Container = styled(Content)`
  max-width: 100%;
  margin: 0 auto;
  padding: 2rem 1rem;
  height: "100%";

  @media (min-width: 576px) {
    max-width: 576px;
  }

  @media (min-width: 768px) {
    max-width: 768px;
  }

  @media (min-width: 992px) {
    max-width: 992px;
  }

  @media (min-width: 1200px) {
    max-width: 1200px;
  }
`;

const MainLayout = styled(Layout)`
  height: 100%;
  background-color: white !important;
`;

export const BaseLayout = React.memo(
  ({ children }: PropsWithChildren<unknown>) => {
    return (
      <MainLayout>
        <Header className="d-flex">
          <AppBar />
        </Header>
        <Container>{children}</Container>
      </MainLayout>
    );
  }
);
