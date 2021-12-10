import { useMemo } from "react";
import { StarAtlasEntity } from "~/components/cards/Ship/types";

export const useShip = (ship: StarAtlasEntity) => {
  const saleIsNotBegin = useMemo(() => {
    const now = Math.floor(Date.now() / 1000);
    return ship?.primarySales?.some((sale) => now < sale.listTimestamp);
  }, [ship]);

  const saleDate = useMemo(() => {
    const saleTimestamps = ship?.primarySales?.map(
      (sale) => sale.listTimestamp
    );
    if (!saleTimestamps) return null;

    const timestamp = Math.min(...saleTimestamps);

    return new Date(timestamp * 1000);
  }, []);

  return {
    saleIsNotBegin,
    saleDate,
  };
};
