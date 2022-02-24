import create from "zustand";
import { devtools } from "zustand/middleware";
import { ChartResponses, ChartType } from "~/types/api";
import { fetchChart as fetchChartApi } from "./fetchChart";

export type ChartEntries = Partial<ChartResponses>;

type ApiStore = {
  charts: ChartEntries;
  loadingCharts: ChartType[];
  fetchChart: (
    chart: ChartType,
    publicKey: string,
    signature: string,
    force?: boolean
  ) => void;
};

export const useChartsStore = create<ApiStore>(
  devtools(
    (set, get) => ({
      charts: {},
      loadingCharts: [],
      fetchChart: async (chart, publicKey, signature, force = false) => {
        const chartData = get().charts?.[chart];

        if (!force && chartData) {
          // Skip fetch if data already exists
          // and force is false
          return;
        }

        set((state) => ({
          loadingCharts: [...state.loadingCharts, chart],
        }));

        const response = await fetchChartApi(chart, publicKey, signature);

        set((state) => {
          const newLoadingCharts = new Set(state.loadingCharts);
          newLoadingCharts.delete(chart);

          return {
            loadingCharts: Array.from(newLoadingCharts),
            charts: {
              ...state.charts,
              [chart]: response,
            },
          };
        });
      },
    }),
    { name: "API_STORE" }
  )
);
