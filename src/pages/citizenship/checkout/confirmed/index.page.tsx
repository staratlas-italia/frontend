import Head from "next/head";
import { SelfRetriever } from "~/components/SelfRetriever";
import { FactionGuard } from "../../FactionGuard";
import { ReferenceRetriever } from "../components/ReferenceRetriever";
import { View } from "./View";

const CitizenshipConfirmed = () => (
  <>
    <Head>
      <title>Confirm Citizenship - StarAtlasItalia</title>
    </Head>

    <FactionGuard>
      <SelfRetriever>
        <ReferenceRetriever>
          <View />
        </ReferenceRetriever>
      </SelfRetriever>
    </FactionGuard>
  </>
);

export default CitizenshipConfirmed;
