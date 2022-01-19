import classNames from "classnames";
import { Text } from "~/components/common/Text";
import { Flex } from "~/components/layout/Flex";
import Countdown from "react-countdown";

type Time = {
  days: number;
  hours: number;
  minutes: number;
  seconds?: number;
  completed: boolean;
};

export const Progress = ({
  title,
  level,
  max,
  millisecondsToBurnOne,
}: {
  title;
  level: number;
  max: number;
  millisecondsToBurnOne: number;
}) => {
  const percentage = Math.floor((level * 100) / max);

  const rendererCountdown = ({ days, hours, minutes, completed }: Time) => {
    if (completed) {
      // Render a completed state
      return "RE-SUPPLY!";
    } else {
      // Render a countdown
      return (
        <span>
          {days < 1 ? "" : days + "D:"}
          {hours < 10 ? "0" + hours : hours}H:
          {minutes < 10 ? "0" + minutes : minutes}M
        </span>
      );
    }
  };

  return (
    <Flex direction="col" className="w-full">
      <Flex justify="between">
        <Text color={"white"} transform="uppercase" weight="semibold">
          {title} -{" "}
          <Countdown
            daysInHours={true}
            date={Date.now() + Math.floor(millisecondsToBurnOne * level)}
            renderer={rendererCountdown}
          />
        </Text>

        <Text color={percentage <= 0 ? "red-600" : "white"} weight="semibold">
          {percentage >= 0 ? percentage : 0}%
        </Text>
      </Flex>
      <div className="w-full bg-gray-100 h-1.5">
        <div
          className={classNames("transition-all  h-1.5", {
            "bg-green-500": percentage > 50,
            "bg-yellow-300": percentage > 25 && percentage <= 50,
            "bg-red-600": percentage <= 25,
          })}
          style={{ width: `${percentage >= 0 ? percentage : 100}%` }}
        />
      </div>
    </Flex>
  );
};
