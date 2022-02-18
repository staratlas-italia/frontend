import { ReactNode, useCallback } from "react";
import { ChartData, useApiStore } from "~/stores/useApiStore";
import { ChartType } from "~/utils/getRoute";
import { ChartLoader } from "~/views/admin/Stats/components/ChartLoader";

type Props = {
  chart: ChartType;
  children: (data: ChartData) => ReactNode;
  title: string;
};

export const DataRetriever = ({ chart, children, title }: Props) => {
  const chartData = useApiStore(
    useCallback((state) => state.charts?.[chart], [chart])
  );

  if (!chartData) {
    return null;
  }

  const { loading } = chartData;

  if (loading) {
    return <ChartLoader title={title} />;
  }

  return <>{children(chartData)}</>;
};
