import { useEffect, useState } from "react";
import { useShip } from "~/hooks/useShip";
import { BestPrices, Currency } from "~/types";
import { getEntityBestPrices } from "~/utils/getEntityBestPrices";

export const useEntityBestPrices = (
  currency: Exclude<Currency, "POLIS"> = "USDC"
) => {
  const { mint } = useShip();
  const [data, setData] = useState<BestPrices>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const run = async () => {
      setLoading(true);

      const result = await getEntityBestPrices(mint || "", currency);

      setLoading(false);
      setData(result);
    };

    run();
  }, [currency, mint, setLoading]);

  return {
    ...data,
    loading,
  };
};
