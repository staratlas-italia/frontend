import { VictoryContainer, VictoryPie } from "victory";

const data = [
  { x: "ONI", y: 50 },
  { x: "MUD", y: 30 },
  { x: "USTUR", y: 20 },
];

const colorScale = [
  "rgba(255,255,255,0.4)",
  "rgba(255,255,255,0.3)",
  "rgba(255,255,255,0.2)",
];

export const Pie2 = () => {
  return (
    <VictoryPie
      padAngle={1}
      innerRadius={100}
      data={data}
      colorScale={colorScale}
      containerComponent={<VictoryContainer responsive />}
    />
  );
};
