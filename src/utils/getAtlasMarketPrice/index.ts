import axios from "axios";

export const getAtlasMarketPrice = async () => {
  const result = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=star-atlas&vs_currencies=usd`
  );

  return parseFloat(result?.data?.["star-atlas"]?.usd || 0);
};
