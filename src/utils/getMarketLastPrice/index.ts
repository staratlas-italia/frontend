import axios from "axios";
import { DEXLAB_API_URL } from "~/common/constants";

export const getMarketLastPrice = async (address: string) => {
  const result = await axios.get(`${DEXLAB_API_URL}/prices/${address}/last`);

  return result.data.data.price;
};
