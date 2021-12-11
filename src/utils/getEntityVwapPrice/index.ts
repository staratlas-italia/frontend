import { Sale } from "~/types";

export const getEntityVwapPrice = (sales: Sale[]) => {
  let totalEntities = 0;

  const totalRevenue =
    sales?.reduce((result, item) => {
      totalEntities += item.supply;
      result += item.price * item.supply;

      return result;
    }, 0) || 0;

  return totalRevenue / totalEntities;
};
