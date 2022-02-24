import React, { useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from "recharts";
import { Text } from "~/components/common/Text";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Flex } from "~/components/layout/Flex";
import { DataRetriever } from "~/views/admin/Stats/components/DataRetriever";

const COLORS = [
  "#e60049",
  "#0bb4ff",
  "#50e991",
  "#e6d800",
  "#9b19f5",
  "#ffa300",
  "#dc0ab4",
  "#b3d4ff",
  "#00bfa0",
];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    percent,
    value,
    name,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} textAnchor="middle" fill="#fff" fontWeight={600}>
        {name}
      </text>
      <text x={cx} y={cy} dy={20} textAnchor="middle" fill="#fff">
        {value}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill={fill}
        fontWeight={600}
      >
        {name}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#fff"
        fontWeight={400}
      >
        {`Rate ${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};

type Props = {
  title: string;
  unit?: string;
};

export const FactionsPie = ({ unit, title }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <DataRetriever chart="faction-pie" title={title}>
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
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    cx="50%"
                    cy="50%"
                    data={data}
                    dataKey="value"
                    innerRadius={"40%"}
                    nameKey="label"
                    outerRadius={"60%"}
                    onMouseEnter={(_, index) => setActiveIndex(index)}
                    onTouchEnd={(_, index) => setActiveIndex(index)}
                  >
                    {data.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Flex>
        </BlurBackground>
      )}
    </DataRetriever>
  );
};
