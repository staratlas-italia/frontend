import Head from "next/head";
import { SwapStateAccountGuard } from "~/components/SwapStateAccountGuard";
import { SwapProgramPriceRetriever } from "~/hooks/useSwapProgramPrice";
import { View } from "./View";

const CitizenshipConfirmed = () => (
  <>
    <Head>
      <title>Confirm Citizenship - StarAtlasItalia</title>
    </Head>

    <SwapStateAccountGuard>
      <SwapProgramPriceRetriever>
        <View />
      </SwapProgramPriceRetriever>
    </SwapStateAccountGuard>
  </>
);

export default CitizenshipConfirmed;
