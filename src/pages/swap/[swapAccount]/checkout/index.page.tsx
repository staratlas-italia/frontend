import Head from "next/head";
import { SwapStateAccountGuard } from "~/components/SwapStateAccountGuard";
import { useRefreshAlert } from "~/hooks/useRefreshAlert";
import { SwapProgramPriceRetriever } from "~/hooks/useSwapProgramPrice";

import { View } from "./components/View";

const Citizenship = () => {
  useRefreshAlert();

  return (
    <>
      <Head>
        <title>Citizenship - StarAtlasItalia</title>
      </Head>

      <SwapStateAccountGuard>
        <SwapProgramPriceRetriever>
          <View />
        </SwapProgramPriceRetriever>
      </SwapStateAccountGuard>
    </>
  );
};

export default Citizenship;
