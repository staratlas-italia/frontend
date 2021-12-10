import axios from "axios";
import { useEffect, useState } from "react";
import { StarAtlasEntity } from "~/components/cards/Ship/types";

const BASE_URL = "https://api.dexlab.space/v1";

type Currency = "USDC" | "ATLAS";

type DexlabPrice = {
  market: string;
  marketAddress: string;
  price: string;
  time: string;
};

export const useEntityPrice = (
  entity: StarAtlasEntity,
  currency: Currency = "USDC"
) => {
  const [data, setData] = useState<DexlabPrice>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      const market = entity.markets.find(
        (market) => market.quotePair === currency
      );

      if (market) {
        const result = await axios.get(`${BASE_URL}/prices/${market.id}/last`);

        setData(result.data.data);
      }
      setLoading(false);
    };

    run();
  }, [entity, setLoading]);

  return {
    price: data?.price,

    loading,
  };
};
