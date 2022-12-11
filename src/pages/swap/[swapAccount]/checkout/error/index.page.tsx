import Head from "next/head";
import { SwapStateAccountGuard } from "~/components/SwapStateAccountGuard";
import { View } from "./View";

const Citizenship = () => (
  <>
    <Head>
      <title>Citizenship - StarAtlasItalia</title>
    </Head>

    <SwapStateAccountGuard>
      <View />
    </SwapStateAccountGuard>
  </>
);

export default Citizenship;
