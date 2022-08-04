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
          return "sm:items-baseline";
        case "md":
          return "md:items-baseline";
        case "lg":
          return "lg:items-baseline";
        case "xl":
          return "xl:items-baseline";
        case "2xl":
          return "2xl:items-baseline";
        default:
          return "items-baseline";
      }
    case "center":
      switch (size) {
        case "sm":
          return "sm:items-center";
        case "md":
          return "md:items-center";
        case "lg":
          return "lg:items-center";
        case "xl":
          return "xl:items-center";
        case "2xl":
          return "2xl:items-center";
        default:
          return "items-center";
      }
    case "end":
      switch (size) {
        case "sm":
          return "sm:items-end";
        case "md":
          return "md:items-end";
        case "lg":
          return "lg:items-end";
        case "xl":
          return "xl:items-end";
        case "2xl":
          return "2xl:items-end";
        default:
          return "items-end";
      }
    case "start":
      switch (size) {
        case "sm":
          return "sm:items-start";
        case "md":
          return "md:items-start";
        case "lg":
          return "lg:items-start";
        case "xl":
          return "xl:items-start";
        case "2xl":
          return "2xl:items-start";
        default:
          return "items-start";
      }
    case "stretch":
      switch (size) {
        case "sm":
          return "sm:items-stretch";
        case "md":
          return "md:items-stretch";
        case "lg":
          return "lg:items-stretch";
        case "xl":
          return "xl:items-stretch";
        case "2xl":
          return "2xl:items-stretch";
        default:
          return "items-stretch";
      }
  }
};
