import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo } from "react";
import useSWR from "swr";
import { useLocalStorage } from "~/hooks/useLocalStorage";
import { StarAtlasEntity } from "~/types";

export type ShipsContextState = {
  loading: boolean;
  ships: StarAtlasEntity[];
};

export const ShipsContext = createContext<ShipsContextState>(
  {} as ShipsContextState
);

const saleIsNotBegin = (item: StarAtlasEntity) => {
  const now = Math.floor(Date.now() / 1000);
  return item?.primarySales?.some((sale) => now < sale.listTimestamp);
};

const saleIsBegin = (item: StarAtlasEntity) => !saleIsNotBegin(item);

export const useShips = () => {
  const { ships, loading } = useContext(ShipsContext);

  const availableShips = useMemo(() => ships.filter(saleIsBegin), [ships]);
  const notAvailableShips = useMemo(
    () => ships.filter(saleIsNotBegin),
    [ships]
  );

  return { ships: availableShips, notAvailableShips, loading };
};

export const useShip = () => {
  const {
    query: { id },
  } = useRouter();

  const { ships, loading } = useShips();

  const ship = useMemo(() => ships?.find((s) => s._id === id), [id, loading]);

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
    loading,
    saleIsNotBegin,
    saleDate,
  };
};

const fetcher = (url) => fetch(url).then((res) => res.json());

export const ShipsProvider = ({ children }) => {
  const [shipsData, updateShipsData] = useLocalStorage<{
    lastUpdate?: string;
    data: StarAtlasEntity[];
  }>("ships", { data: [] });

  const { data, error } = useSWR<StarAtlasEntity[] | undefined>(
    "/api/ships",
    fetcher
  );

  useEffect(() => {
    if (data?.length) {
      updateShipsData({ lastUpdate: new Date().toISOString(), data });
    }
  }, [data]);

  return (
    <ShipsContext.Provider
      value={{
        ships: shipsData.data,
        loading: !data && !error && !shipsData.data,
      }}
    >
      {children}
    </ShipsContext.Provider>
  );
};
