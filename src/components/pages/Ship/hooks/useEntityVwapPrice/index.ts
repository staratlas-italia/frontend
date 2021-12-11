import { useEffect, useState } from "react";
import { useShip } from "~/contexts/ShipContext";

export const useEntityVwapPrice = () => {
  const { primarySales } = useShip();

  const [vwap, setVwap] = useState<number>();

  useEffect(() => {
    let totalEntities = 0;

    const totalRevenue =
      primarySales?.reduce((result, item) => {
        totalEntities += item.supply;
        result += item.price * item.supply;

        return result;
      }, 0) || 0;

    setVwap(totalRevenue / totalEntities);
  }, [primarySales]);

  return vwap;
};
