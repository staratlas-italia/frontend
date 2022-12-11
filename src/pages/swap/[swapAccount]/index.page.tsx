import Head from "next/head";
import { SwapStateAccountGuard } from "~/components/SwapStateAccountGuard";
import { View } from "./components/View";

const TokenSwap = () => {
  return (
    <>
      <Head>
        <title>Swap - StarAtlasItalia</title>
      </Head>

      <SwapStateAccountGuard>
        <View />
      </SwapStateAccountGuard>
    </>
  );
};

export default TokenSwap;
