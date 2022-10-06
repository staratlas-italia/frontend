import Head from "next/head";
import { ReferenceRetriever } from "~/pages/citizenship/checkout/components/ReferenceRetriever";
import { View } from "./View";

const Citizenship = () => (
  <>
    <Head>
      <title>Citizenship - StarAtlasItalia</title>
    </Head>

    <ReferenceRetriever>
      <View />
    </ReferenceRetriever>
  </>
);

export default Citizenship;
