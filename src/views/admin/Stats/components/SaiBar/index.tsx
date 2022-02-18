import React from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Text as SaiText } from "~/components/common/Text";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Flex } from "~/components/layout/Flex";
import { ChartType } from "~/utils/getRoute";
import { DataRetriever } from "~/views/admin/Stats/components/DataRetriever";

type Props = {
  title: string;
  chart: ChartType;
};

export const SaiBar = ({ chart, title }: Props) => (
  <DataRetriever chart={chart} title={title}>
    {({ data }) => (
      <BlurBackground direction="col" px={5} py={3} justify="center">
        <Flex pb={3}>
          <SaiText
            color="white"
            size="2xl"
            transform="uppercase"
            weight="semibold"
          >
            {title}
          </SaiText>
        </Flex>
        <Flex justify="center" className="min-h-10">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              barGap={10}
              width={500}
              height={400}
              data={data}
              margin={{ bottom: 100 }}
            >
              <XAxis
                dy={5}
                fontSize={14}
                angle={-45}
                interval={0}
                type="category"
                textAnchor="end"
                dataKey="label"
                stroke="#fff"
              />

              <YAxis
                yAxisId={0}
                tickCount={10}
                dataKey="value"
                type="number"
                stroke="#fff"
                unit="%"
                domain={[0, 100]}
              />
              <YAxis
                yAxisId={1}
                orientation="right"
                tickCount={10}
                dataKey="count"
                type="number"
                stroke="#fff"
              />

              <Bar yAxisId={0} unit="%" dataKey="value" fill="#8884d8" />
              <Bar yAxisId={1} unit="ships" dataKey="count" fill="#20c444" />

              <Tooltip cursor={{ fill: "rgba(33,33,33,0.2)" }} />
            </BarChart>
          </ResponsiveContainer>
        </Flex>
      </BlurBackground>
    )}
  </DataRetriever>
);
