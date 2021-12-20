import { useEffect, useState } from "react";
import { ATLAS_USDC_MARKET_ADDR } from "~/common/constants";
import { getMarketLastPrice } from "~/utils/getMarketLastPrice";

export const useAtlasPrice = () => {
  const [price, setPrice] = useState<number>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const run = async () => {
      setLoading(true);

      const price = await getMarketLastPrice(ATLAS_USDC_MARKET_ADDR);

      setLoading(false);
      setPrice(price);
    };

    run();
  }, []);

  return { loading, price };
};
