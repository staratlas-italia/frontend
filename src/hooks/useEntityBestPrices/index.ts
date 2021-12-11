import { useEffect, useState } from "react";
import { useShip } from "~/contexts/ShipContext";
import { BestPrices, getEntityBestPrices } from "~/utils/getEntityBestPrices";

type Currency = "USDC" | "ATLAS";

export const useEntityBestPrices = (currency: Currency = "USDC") => {
  const { markets } = useShip();
  const [data, setData] = useState<BestPrices>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const run = async () => {
      setLoading(true);

      const result = await getEntityBestPrices(markets, currency);

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
