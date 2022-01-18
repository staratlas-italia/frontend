import { Align } from "~/components/layout/Flex/types";
import { ScreenSize } from "~/types";

type Param = {
  align?: Align;
  size?: ScreenSize;
};

export const getAlignClasses = ({ align, size }: Param) => {
  if (!align) {
    return null;
  }

  switch (align) {
    case "baseline":
      switch (size) {
        case "sm":
          return "sm:align-baseline";
        case "md":
          return "md:align-baseline";
        case "lg":
          return "lg:align-baseline";
        case "xl":
          return "xl:align-baseline";
        case "2xl":
          return "2xl:align-baseline";
        default:
          return "align-baseline";
      }
    case "center":
      switch (size) {
        case "sm":
          return "sm:align-center";
        case "md":
          return "md:align-center";
        case "lg":
          return "lg:align-center";
        case "xl":
          return "xl:align-center";
        case "2xl":
          return "2xl:align-center";
        default:
          return "align-center";
      }
    case "end":
      switch (size) {
        case "sm":
          return "sm:align-end";
        case "md":
          return "md:align-end";
        case "lg":
          return "lg:align-end";
        case "xl":
          return "xl:align-end";
        case "2xl":
          return "2xl:align-end";
        default:
          return "align-end";
      }
    case "start":
      switch (size) {
        case "sm":
          return "sm:align-start";
        case "md":
          return "md:align-start";
        case "lg":
          return "lg:align-start";
        case "xl":
          return "xl:align-start";
        case "2xl":
          return "2xl:align-start";
        default:
          return "align-start";
      }
    case "stretch":
      switch (size) {
        case "sm":
          return "sm:align-stretch";
        case "md":
          return "md:align-stretch";
        case "lg":
          return "lg:align-stretch";
        case "xl":
          return "xl:align-stretch";
        case "2xl":
          return "2xl:align-stretch";
        default:
          return "align-stretch";
      }
  }
};
