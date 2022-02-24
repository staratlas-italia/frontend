import React, { useCallback, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from "recharts";
import { Text } from "~/components/common/Text";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Flex } from "~/components/layout/Flex";
import { DataRetriever } from "~/views/admin/Stats/components/DataRetriever";

const TIERS_COLORS = ["#a6d75b", "#c9e52f", "#d0ee11", "#d0f400"];
const FACTION_TIERS_COLORS = ["#115f9a", "#1984c5", "#22a7f0", "#48b5c4"];

type Props = {
  title: string;
  unit?: string;
};

export const FactionTiersPie = ({ unit, title }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number>();
  const [activeTierIndex, setActiveTierIndex] = useState<number>();

  const handleTierEvent = useCallback((_, index: number) => {
    setActiveIndex(undefined);
    setActiveTierIndex(index);
  }, []);

  const handleTierFactionEvent = useCallback((_, index: number) => {
    setActiveTierIndex(undefined);
    setActiveIndex(index);
  }, []);

  return (
    <DataRetriever chart="faction-tiers-pie" title={title}>
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
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  activeIndex={activeTierIndex}
                  activeShape={renderActiveShape(true)}
                  cx="50%"
                  cy="50%"
                  data={data.tiersData}
                  dataKey="value"
                  nameKey="label"
                  outerRadius={"30%"}
                  onMouseEnter={handleTierEvent}
                  onTouchEnd={handleTierEvent}
                >
                  {data.tiersData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={TIERS_COLORS[index % TIERS_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Pie
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape(false)}
                  cx="50%"
                  cy="50%"
                  data={data.factionTiersData}
                  dataKey="value"
                  innerRadius={"40%"}
                  nameKey="label"
                  outerRadius={"60%"}
                  onMouseEnter={handleTierFactionEvent}
                  onTouchEnd={handleTierFactionEvent}
                >
                  {data.factionTiersData.map((_, index) => (
                    <>
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          FACTION_TIERS_COLORS[
                            index % FACTION_TIERS_COLORS.length
                          ]
                        }
                      />
                    </>
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Flex>
        </BlurBackground>
      )}
    </DataRetriever>
  );
};

const renderActiveShape = (double: boolean) => (props) => {
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

  const biggerOuterRadius = double ? outerRadius * 2 : outerRadius;

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (biggerOuterRadius + 10) * cos;
  const sy = cy + (biggerOuterRadius + 10) * sin;
  const mx = cx + (biggerOuterRadius + 30) * cos;
  const my = cy + (biggerOuterRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
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
        innerRadius={biggerOuterRadius + 6}
        outerRadius={biggerOuterRadius + 10}
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
        {`${new Intl.NumberFormat().format(value)} $`}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={34}
        textAnchor={textAnchor}
        fill="#fff"
        fontWeight={400}
      >
        {`Rate ${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};
