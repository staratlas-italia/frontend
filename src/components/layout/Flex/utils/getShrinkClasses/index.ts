import { Shrink } from "~/components/layout/Flex/types";
import { ScreenSize } from "~/types";
import { isNullOrUndefined } from "~/utils/isNullOrUndefined";

type Param = {
  shrink?: Shrink;
  size?: ScreenSize;
};

export const getShrinkClasses = ({ shrink, size }: Param) => {
  if (isNullOrUndefined(shrink)) {
    return null;
  }

  switch (shrink) {
    case 0:
      switch (size) {
        case "sm":
          return "sm:shrink-0";
        case "md":
          return "md:shrink-0";
        case "lg":
          return "lg:shrink-0";
        case "xl":
          return "xl:shrink-0";
        case "2xl":
          return "2xl:shrink-0";
        default:
          return "shrink-0";
      }
    case 1:
      switch (size) {
        case "sm":
          return "sm:shrink";
        case "md":
          return "md:shrink";
        case "lg":
          return "lg:shrink";
        case "xl":
          return "xl:shrink";
        case "2xl":
          return "2xl:shrink";
        default:
          return "shrink";
      }
  }
};
