import Head from "next/head";
import { DashboardPage } from "~/views/Dashboard";

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>Dashboard - StarAtlasItalia</title>
      </Head>
      <DashboardPage />
    </>
  );
};

export default Dashboard;
