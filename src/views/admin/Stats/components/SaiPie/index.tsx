import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Text } from "~/components/common/Text";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Flex } from "~/components/layout/Flex";
import { ChartData } from "~/stores/useChartsStore";
import { ChartType } from "~/utils/getRoute";
import { DataRetriever } from "~/views/admin/Stats/components/DataRetriever";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const renderLabel =
  (data: ChartData["data"], unit?: string) =>
  ({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = 25 + innerRadius + (outerRadius - innerRadius);
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill={COLORS[index % COLORS.length]}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontWeight={600}
      >
        {data[index].label} - {value}
        {unit}
      </text>
    );
  };

type Props = {
  title: string;
  unit?: string;
  chart: ChartType;
};

export const SaiPie = ({ chart, unit, title }: Props) => (
  <DataRetriever chart={chart} title={title}>
    {({ data }) => (
      <BlurBackground direction="col" px={5} py={3} className="h-full">
        <Flex pb={3}>
          <Text
            color="white"
            size="2xl"
            transform="uppercase"
            weight="semibold"
          >
            {title}
          </Text>
        </Flex>
        <Flex align="center" justify="center" className="h-full">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={90}
                nameKey="label"
                label={renderLabel(data, unit)}
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Flex>
      </BlurBackground>
    )}
  </DataRetriever>
);
