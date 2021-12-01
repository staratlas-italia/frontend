import { Button, Col, Divider, Grid, Row, Typography } from "antd";
import classNames from "classnames";
import Head from "next/head";
import React from "react";
import { HumanBanner } from "../components/HumanBanner";
import { Flex } from "../components/layout/Flex";
import { ShipBanner } from "../components/ShipBanner";

const { useBreakpoint } = Grid;

const Home = () => {
  const screens = useBreakpoint();

  return (
    <>
      <Head>
        <title>Home - StarAtlasItalia</title>
      </Head>
      <Row justify="center" align="middle" gutter={[16, 17]}>
        <Col span={24} md={12}>
          <Typography.Title>Benvenuto!</Typography.Title>
          <Typography.Paragraph>
            Un cataclisma cosmico ha generato un tesoro di Minerali al centro
            della galassia. Le tre fazioni in lotta da millenni rivolgono ora le
            brame di conquista agli immensi tesori di Star Atlas.
          </Typography.Paragraph>
          <Typography.Paragraph strong>
            Sei pronto a unirti alla gilda più grande d'Italia?
          </Typography.Paragraph>
        </Col>
        <Col span={24} md={12}>
          <ShipBanner />
        </Col>
        <Divider />
      </Row>

      <Row justify="center" align="middle" gutter={[16, 17]}>
        <Col span={24} md={12}>
          <HumanBanner />
        </Col>
        <Col span={24} md={12}>
          <Typography.Title>Vuoi far parte della gilda?</Typography.Title>
          <Typography.Paragraph>
            L’ingresso nella guild Star Atlas Italia è vincolato al pagamento di
            una fee di ingresso che sarà destinata all’acquisto di asset come
            ship, land e token.
          </Typography.Paragraph>
          <Typography.Paragraph>
            Introduzione di questa fee consentirà alla Gilda di avere una base
            di asset su cui poter contare. In base all’ammontare investito nella
            Guild verranno airdroppati 1 o più NFT che rappresenteranno le quote
            di partecipazione alla Gilda, avendo a tutti gli effetti il potere
            di decidere su di essa (DAO).
          </Typography.Paragraph>
          <Flex justify="end" pt={5}>
            <Button
              className={classNames({ "w-100": !screens.md })}
              href="https://forms.gle/U9HpjDEMACB86ucN8"
              shape="round"
              size="large"
              target="_blank"
            >
              Vuoi arruolati? - Clicca qui
            </Button>
          </Flex>
        </Col>
        <Divider />
      </Row>
    </>
  );
};

export default Home;
