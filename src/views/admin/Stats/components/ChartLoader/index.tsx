import { Label, Pie, PieChart, ResponsiveContainer } from "recharts";
import { Text } from "~/components/common/Text";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Flex } from "~/components/layout/Flex";

type Props = { title: string };

const getRandomIntInclusive = (min: number, max: number) => {
  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);
  return Math.floor(Math.random() * (maxInt - minInt + 1) + minInt);
};

const getRandomData = () => {
  const items = getRandomIntInclusive(2, 5);

  return new Array(items)
    .fill(0)
    .map(() => ({ value: getRandomIntInclusive(5, 100) }));
};

export const ChartLoader = ({ title }: Props) => (
  <BlurBackground direction="col" px={5} py={3} justify="center">
    <Flex pb={3}>
      <Text color="white" size="2xl" transform="uppercase" weight="semibold">
        {title}
      </Text>
    </Flex>

    <Flex justify="center" className="min-h-10">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart width={400} height={300}>
          <Pie
            cx="50%"
            cy="50%"
            data={getRandomData()}
            dataKey="value"
            fill="rgba(255,255,255,0.3)"
            innerRadius={70}
            isAnimationActive={false}
            outerRadius={90}
            paddingAngle={5}
            stroke="none"
          >
            <Label position="center" fill="rgba(255,255,255,0.8)">
              Loading...
            </Label>
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Flex>
  </BlurBackground>
);
