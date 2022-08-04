import { Direction } from "~/components/layout/Flex/types";
import { ScreenSize } from "~/types";

type Param = {
  direction?: Direction;
  size?: ScreenSize;
};

export const getDirectionClasses = ({ direction, size }: Param) => {
  if (!direction) {
    return null;
  }

  switch (direction) {
    case "row":
      switch (size) {
        case "sm":
          return "sm:flex-row";
        case "md":
          return "md:flex-row";
        case "lg":
          return "lg:flex-row";
        case "xl":
          return "xl:flex-row";
        case "2xl":
          return "2xl:flex-row";
        default:
          return "flex-row";
      }
    case "row-reverse":
      switch (size) {
        case "sm":
          return "sm:flex-row-reverse";
        case "md":
          return "md:flex-row-reverse";
        case "lg":
          return "lg:flex-row-reverse";
        case "xl":
          return "xl:flex-row-reverse";
        case "2xl":
          return "2xl:flex-row-reverse";
        default:
          return "flex-row-reverse";
      }
    case "col":
      switch (size) {
        case "sm":
          return "sm:flex-col";
        case "md":
          return "md:flex-col";
        case "lg":
          return "lg:flex-col";
        case "xl":
          return "xl:flex-col";
        case "2xl":
          return "2xl:flex-col";
        default:
          return "flex-col";
      }
    case "col-reverse":
      switch (size) {
        case "sm":
          return "sm:flex-col-reverse";
        case "md":
          return "md:flex-col-reverse";
        case "lg":
          return "lg:flex-col-reverse";
        case "xl":
          return "xl:flex-col-reverse";
        case "2xl":
          return "2xl:flex-col-reverse";
        default:
          return "flex-col-reverse";
      }
  }
};
