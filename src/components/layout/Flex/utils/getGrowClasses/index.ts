import { Grow } from "~/components/layout/Flex/types";
import { ScreenSize } from "~/types";
import { isNullOrUndefined } from "~/utils/isNullOrUndefined";

type Param = {
  grow?: Grow;
  size?: ScreenSize;
};

export const getGrowClasses = ({ grow, size }: Param) => {
  if (isNullOrUndefined(grow)) {
    return null;
  }

  switch (grow) {
    case 0:
      switch (size) {
        case "sm":
          return "sm:grow-0";
        case "md":
          return "md:grow-0";
        case "lg":
          return "lg:grow-0";
        case "xl":
          return "xl:grow-0";
        case "2xl":
          return "2xl:grow-0";
        default:
          return "grow-0";
      }
    case 1:
      switch (size) {
        case "sm":
          return "sm:grow";
        case "md":
          return "md:grow";
        case "lg":
          return "lg:grow";
        case "xl":
          return "xl:grow";
        case "2xl":
          return "2xl:grow";
        default:
          return "grow";
      }
  }
};
