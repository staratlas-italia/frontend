import axios from "axios";
import { ChartResponses, ChartType } from "~/types/api";
import { getApiRoute } from "~/utils/getRoute";

export const fetchChart = async <C extends ChartType>(
  chart: C,
  publicKey: string,
  signature: string
) => {
  const respose = await axios.post<ChartResponses[C]>(
    getApiRoute(`/api/charts/${chart}`),
    {
      publicKey,
      signature,
    }
  );

  return respose.data;
};
