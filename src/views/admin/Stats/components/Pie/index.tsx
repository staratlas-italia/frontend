import { GradientLightgreenGreen } from "@visx/gradient";
import { Group } from "@visx/group";
import { scaleOrdinal } from "@visx/scale";
import { Pie as PieChart } from "@visx/shape";

const defaultMargin = { top: 10, right: 10, bottom: 10, left: 10 };
const frequency = (d) => d.frequency;

const data = [
  { label: "ONI", frequency: 50 },
  { label: "MUD", frequency: 30 },
  { label: "USTUR", frequency: 20 },
];

type Props = {
  width?: number;
  height?: number;
  margin?: typeof defaultMargin;
};

const factionNames = data.map((d) => d.label);

const getFactionColor = scaleOrdinal({
  domain: factionNames,
  range: [
    "rgba(255,255,255,0.4)",
    "rgba(255,255,255,0.3)",
    "rgba(255,255,255,0.2)",
  ],
});

export const Pie = ({
  width = 100,
  height = 100,
  margin = defaultMargin,
}: Props) => {
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const radius = Math.min(innerWidth, innerHeight) / 2;
  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;
  const top = centerY + margin.top;
  const left = centerX + margin.left;
  const pieSortValues = (a, b) => b - a;

  return (
    <svg viewBox="0 0 100 100">
      <GradientLightgreenGreen id="visx-pie-gradient" />
      <rect
        rx={14}
        width={width}
        height={height}
        fill="url('#visx-pie-gradient')"
      />
      <Group top={top} left={left}>
        <PieChart
          data={data}
          pieValue={frequency}
          pieSortValues={pieSortValues}
          outerRadius={radius}
        >
          {(pie) => {
            return pie.arcs.map((arc, index) => {
              const { letter } = arc.data;
              const [centroidX, centroidY] = pie.path.centroid(arc);
              const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;
              const arcPath = pie.path(arc) || undefined;

              return (
                <g key={`arc-${letter}-${index}`}>
                  <path d={arcPath} fill={getFactionColor(arc.data.label)} />
                  {hasSpaceForLabel && (
                    <>
                      <text
                        x={centroidX}
                        y={centroidY}
                        dy=".33em"
                        fill="#fff"
                        fontSize={4}
                        textAnchor="middle"
                        pointerEvents="none"
                      >
                        {arc.data.label}
                      </text>
                      <text
                        x={centroidX}
                        y={centroidY}
                        dy="1.5em"
                        fill="#fff"
                        fontSize={4}
                        textAnchor="middle"
                        pointerEvents="none"
                      >
                        {arc.data.frequency}%
                      </text>
                    </>
                  )}
                </g>
              );
            });
          }}
        </PieChart>
      </Group>
    </svg>
  );
};
