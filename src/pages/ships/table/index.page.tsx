import Head from "next/head";
import React from "react";
import { StarAtlasEntity } from "~/types";
import { ShipListPage } from "~/views/Ships";

type Props = {
  data: StarAtlasEntity[];
};

const ShipsPage = ({ data }: Props) => (
  <>
    <Head>
      <title>Ships - StarAtlasItalia</title>
    </Head>
    <ShipListPage />
  </>
);

export default ShipsPage;
