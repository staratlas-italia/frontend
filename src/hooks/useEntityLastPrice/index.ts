import axios from "axios";
import { useEffect, useState } from "react";
import { DEXLAB_API_URL } from "~/common/constants";
import { useShip } from "~/contexts/ShipsContext";
import { Currency } from "~/types";

type DexlabPrice = {
  market: string;
  marketAddress: string;
  price: string;
  time: string;
};

export const useEntityLastPrice = (currency: Currency = "USDC") => {
  const { markets } = useShip();
  const [data, setData] = useState<DexlabPrice>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      const market = markets?.find((market) => market.quotePair === currency);

      if (market) {
        const result = await axios.get(
          `${DEXLAB_API_URL}/prices/${market.id}/last`
        );

        setData(result.data.data);
      }
      setLoading(false);
    };

    run();
  }, [markets, setLoading]);

  return {
    price: data?.price,

    loading,
  };
};
