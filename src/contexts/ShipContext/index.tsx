import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { StarAtlasEntity } from "~/types";

export type ShipContextState = {
  ship?: StarAtlasEntity;
};

export const ShipContext = createContext<ShipContextState>({});

export const useShip = () => {
  const { ship } = useContext(ShipContext);

  const saleIsNotBegin = useMemo(() => {
    if (!ship) return null;
    const now = Math.floor(Date.now() / 1000);
    return ship?.primarySales?.some((sale) => now < sale.listTimestamp);
  }, [ship]);

  const saleDate = useMemo(() => {
    if (!ship) return null;
    const saleTimestamps = ship?.primarySales?.map(
      (sale) => sale.listTimestamp
    );
    if (!saleTimestamps) return null;

    const timestamp = Math.min(...saleTimestamps);

    return new Date(timestamp * 1000);
  }, []);

  return {
    ...ship,
    saleIsNotBegin,
    saleDate,
  };
};

type Props = PropsWithChildren<{ ship: StarAtlasEntity }>;

export const ShipProvider = ({ ship, children }: Props) => {
  return (
    <ShipContext.Provider value={{ ship }}>{children}</ShipContext.Provider>
  );
};
