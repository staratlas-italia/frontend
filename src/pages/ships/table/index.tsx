import Head from "next/head";
import React from "react";
import { ShipListPage } from "~/components/pages/Ships";
import { StarAtlasEntity } from "~/types";

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
