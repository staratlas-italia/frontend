import { useEffect, useState } from "react";
import { useShip } from "~/contexts/ShipsContext";
import { Currency } from "~/types";
import { getMarketLastPrice } from "~/utils/getMarketLastPrice";

export const useEntityLastPrice = (currency: Currency = "USDC") => {
  const { markets } = useShip();
  const [price, setPrice] = useState<number>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      const market = markets?.find((market) => market.quotePair === currency);

      if (market) {
        const price = await getMarketLastPrice(market.id);

        setPrice(price);
      }
      setLoading(false);
    };

    run();
  }, [markets, setLoading]);

  return {
    price,
    loading,
  };
};
