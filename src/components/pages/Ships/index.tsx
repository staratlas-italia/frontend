import { useRouter } from "next/router";
import { ShipList } from "~/components/pages/Ships/components/ShipList";
import { ShipTable } from "~/components/pages/Ships/components/ShipTable";
import { Toolbar } from "~/components/pages/Ships/components/Toolbar";

export const ShipListPage = () => {
  const { pathname } = useRouter();

  return (
    <>
      <Toolbar />
      {pathname === "/ships/table" ? <ShipTable /> : <ShipList />}
    </>
  );
};
