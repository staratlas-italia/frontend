import { default as RCountdown } from "react-countdown";

type Time = {
  days: number;
  hours: number;
  minutes: number;
  seconds?: number;
  completed: boolean;
};

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

type Props = {
  date: string | number;
};

export const Countdown = ({ date }: Props) => {
  return (
    <RCountdown daysInHours={true} date={date} renderer={rendererCountdown} />
  );
};
