import { useCallback } from "react";
import { useChartsStore } from "~/stores/useChartsStore";
import { StrictReactNode } from "~/types";
import { ChartResponses, ChartType } from "~/types/api";
import { ChartLoader } from "~/views/admin/Stats/components/ChartLoader";

type Props<C extends ChartType> = {
  chart: C;
  children: (data: ChartResponses[C]) => StrictReactNode;
  title: string;
};

export const DataRetriever = <C extends ChartType>({
  chart,
  children,
  title,
}: Props<C>) => {
  const chartData = useChartsStore(
    useCallback(
      (state) => (chart in state.charts ? state.charts[chart]! : null),
      [chart]
    )
  );

  const isLoading = useChartsStore(
    useCallback((state) => state.loadingCharts.includes(chart), [chart])
  );

  if (isLoading) {
    return <ChartLoader title={title} />;
  }

  if (!chartData) {
    return null;
  }

  return <>{children(chartData as ChartResponses[C])}</>;
};
