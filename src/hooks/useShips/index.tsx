import invariant from "invariant";
import { useMemo } from "react";
import { useShipContext } from "~/contexts/ShipsContext";
import { StarAtlasEntity } from "~/types";

const saleIsNotBegin = (item: StarAtlasEntity) => {
  const now = Math.floor(Date.now() / 1000);
  return item?.primarySales?.some((sale) => now < sale.listTimestamp);
};

const saleIsBegin = (item: StarAtlasEntity) => !saleIsNotBegin(item);

export const useShips = () => {
  const { ships } = useShipContext();

  invariant(
    ships,
    "This hook is meant to be used inside a ShipsRetriever component"
  );

  const availableShips = useMemo(() => ships.filter(saleIsBegin), [ships]);

  const notAvailableShips = useMemo(
    () => ships.filter(saleIsNotBegin),
    [ships]
  );

  return { ships: availableShips, notAvailableShips };
};
