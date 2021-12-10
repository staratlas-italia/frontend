import { useEffect, useState } from "react";
import { StarAtlasEntity } from "~/components/cards/Ship/types";

export const useEntityVwapPrice = (entity: StarAtlasEntity) => {
  const [vwap, setVwap] = useState<number>();

  useEffect(() => {
    let totalEntities = 0;

    const totalRevenue =
      entity?.primarySales?.reduce((result, item) => {
        totalEntities += item.supply;
        result += item.price * item.supply;

        return result;
      }, 0) || 0;

    setVwap(totalRevenue / totalEntities);
  }, [entity]);

  return vwap;
};
