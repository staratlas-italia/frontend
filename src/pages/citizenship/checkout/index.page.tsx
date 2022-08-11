import Head from "next/head";
import { FactionGuard } from "../FactionGuard";
import { View } from "./components/View";

const Citizenship = () => {
  return (
    <>
      <Head>
        <title>Citizenship - StarAtlasItalia</title>
      </Head>

      <FactionGuard>
        <View />
      </FactionGuard>
    </>
  );
};

export default Citizenship;
