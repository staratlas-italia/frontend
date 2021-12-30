import { useRouter } from "next/router";
import { ShipList } from "~/views/Ships/components/ShipList";
import { ShipTable } from "~/views/Ships/components/ShipTable";
import { Toolbar } from "~/views/Ships/components/Toolbar";

export const ShipListPage = () => {
  const { pathname } = useRouter();

  return (
    <>
      <Toolbar />
      {pathname.includes("/ships/table") ? <ShipTable /> : <ShipList />}
    </>
  );
};
