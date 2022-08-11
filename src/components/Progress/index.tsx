import classNames from "classnames";
import { Text } from "~/components/common/Text";
import { Flex } from "~/components/layout/Flex";

type Props = {
  title: string | JSX.Element;
  level: number;
  max: number;
};

export const Progress = ({ title, level, max }: Props) => {
  const percentage = Math.floor((level * 100) / max);

  return (
    <Flex direction="col" className="w-full">
      <Flex justify="between">
        <Text color="text-white" transform="uppercase" weight="semibold">
          {title}
        </Text>

        <Text
          color={percentage <= 0 ? "text-red-600" : "text-white"}
          weight="semibold"
        >
          {percentage >= 0 ? percentage : 0}%
        </Text>
      </Flex>
      <div className="w-full bg-gray-100 h-1.5">
        <div
          className={classNames("transition-all  h-1.5", {
            "bg-emerald-500": percentage > 50,
            "bg-yellow-300": percentage > 25 && percentage <= 50,
            "bg-red-600": percentage <= 25,
          })}
          style={{ width: `${percentage >= 0 ? percentage : 100}%` }}
        />
      </div>
    </Flex>
  );
};
