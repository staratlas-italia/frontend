import { useRouter } from "next/router";
import { getRoute } from "~/utils/getRoute";
import { ShipList } from "~/views/Ships/components/ShipList";
import { ShipsRetriever } from "~/views/Ships/components/ShipsRetriever";
import { ShipTable } from "~/views/Ships/components/ShipTable";
import { Toolbar } from "~/views/Ships/components/Toolbar";

export const ShipListPage = () => {
  const { pathname } = useRouter();

  return (
    <ShipsRetriever>
      <Toolbar />
      {pathname === getRoute("/ships/table") ? <ShipTable /> : <ShipList />}
    </ShipsRetriever>
  );
};
