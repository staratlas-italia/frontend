import Head from "next/head";
import React from "react";
import { ShipListPage } from "~/views/Ships";

const ShipsPage = () => (
  <>
    <Head>
      <title>Ships - StarAtlasItalia</title>
    </Head>

    <ShipListPage />
  </>
);

export default ShipsPage;
