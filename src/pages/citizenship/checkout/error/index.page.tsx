import Head from "next/head";
import { ReferenceRetriever } from "~/pages/citizenship/checkout/components/ReferenceRetriever";
import { FactionGuard } from "~/pages/citizenship/FactionGuard";
import { View } from "./View";

const Citizenship = () => (
  <>
    <Head>
      <title>Citizenship - StarAtlasItalia</title>
    </Head>

    <FactionGuard>
      <ReferenceRetriever>
        <View />
      </ReferenceRetriever>
    </FactionGuard>
  </>
);

export default Citizenship;
