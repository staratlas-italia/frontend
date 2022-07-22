import Head from "next/head";
import { Heading } from "~/components/common/Heading";
import { ShipsRetriever } from "~/components/ShipsRetriever";
import { ShipList } from "./components/ShipList";

const ShipsDealsPage = () => (
  <>
    <Head>
      <title>Ships - StarAtlasItalia</title>
    </Head>

    <ShipsRetriever>
      <div className="space-y-5">
        <Heading title="Ships.Heading.title" />

        <ShipList />
      </div>
    </ShipsRetriever>
  </>
);

export default ShipsDealsPage;
