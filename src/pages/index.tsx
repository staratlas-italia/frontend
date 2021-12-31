import Head from "next/head";
import React from "react";
import { HomePage } from "~/views/Home";

const Home = () => {
  return (
    <>
      <Head>
        <title>Home - StarAtlasItalia</title>
      </Head>
      <HomePage />
    </>
  );
};

export default Home;
