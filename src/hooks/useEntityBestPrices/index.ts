import { useEffect, useState } from "react";
import { useShip } from "~/contexts/ShipsContext";
import { Currency } from "~/types";
import { BestPrices, getEntityBestPrices } from "~/utils/getEntityBestPrices";

export const useEntityBestPrices = (currency: Currency = "USDC") => {
  const { markets } = useShip();
  const [data, setData] = useState<BestPrices>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const run = async () => {
      setLoading(true);

      const result = await getEntityBestPrices(markets || [], currency);

      setLoading(false);
      setData(result);
    };

    run();
  }, [markets, setLoading]);

  return {
    ...data,
    loading,
  };
};
