import { useState } from "react";
import { ShipList } from "~/components/pages/Ships/components/ShipList";
import { ShipTable } from "~/components/pages/Ships/components/ShipTable";
import {
  Toolbar,
  ToolbarState,
} from "~/components/pages/Ships/components/Toolbar";
import { StarAtlasEntity } from "~/types";

type Props = { ships: StarAtlasEntity[] };

export const ShipListPage = ({ ships }: Props) => {
  const [toolbarState, setToolbarState] = useState<ToolbarState>("grid");

  return (
    <>
      <Toolbar type={toolbarState} onChange={setToolbarState} />
      {toolbarState === "grid" ? (
        <ShipList ships={ships} />
      ) : (
        <ShipTable ships={ships} />
      )}
    </>
  );
};
