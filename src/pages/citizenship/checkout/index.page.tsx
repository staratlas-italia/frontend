import Head from "next/head";
import { useRefreshAlert } from "~/hooks/useRefreshAlert";
import { FactionGuard } from "../FactionGuard";
import { View } from "./components/View";

const Citizenship = () => {
  useRefreshAlert();

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
