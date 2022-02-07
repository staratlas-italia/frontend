import { BlurBackground } from "~/components/layout/BlurBackground";
import { Pie2 } from "./components/Pie2";

export const Stats = () => {
  return (
    <BlurBackground px={3} py={3} className=" space-x-3" justify="center">
      <Pie2 />
      <Pie2 />
    </BlurBackground>
  );
};
