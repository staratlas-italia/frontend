import { useEffect, useState } from "react";
import { getAtlasMarketPrice } from "~/utils/getAtlasMarketPrice";

export const useAtlasPrice = () => {
  const [price, setPrice] = useState<number>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const run = async () => {
      setLoading(true);

      const price = await getAtlasMarketPrice();

      setLoading(false);
      setPrice(price);
    };

    run();
  }, []);

  return { loading, price };
};
