import { Justify } from "~/components/layout/Flex/types";
import { ScreenSize } from "~/types";

type Param = {
  justify?: Justify;
  size?: ScreenSize;
};

export const getJustifyClasses = ({ justify, size }: Param) => {
  if (!justify) {
    return null;
  }

  switch (justify) {
    case "center":
      switch (size) {
        case "sm":
          return "sm:justify-center";
        case "md":
          return "md:justify-center";
        case "lg":
          return "lg:justify-center";
        case "xl":
          return "xl:justify-center";
        case "2xl":
          return "2xl:justify-center";
        default:
          return "justify-center";
      }
    case "end":
      switch (size) {
        case "sm":
          return "sm:justify-end";
        case "md":
          return "md:justify-end";
        case "lg":
          return "lg:justify-end";
        case "xl":
          return "xl:justify-end";
        case "2xl":
          return "2xl:justify-end";
        default:
          return "justify-end";
      }
    case "start":
      switch (size) {
        case "sm":
          return "sm:justify-start";
        case "md":
          return "md:justify-start";
        case "lg":
          return "lg:justify-start";
        case "xl":
          return "xl:justify-start";
        case "2xl":
          return "2xl:justify-start";
        default:
          return "justify-start";
      }
    case "around":
      switch (size) {
        case "sm":
          return "sm:justify-around";
        case "md":
          return "md:justify-around";
        case "lg":
          return "lg:justify-around";
        case "xl":
          return "xl:justify-around";
        case "2xl":
          return "2xl:justify-around";
        default:
          return "justify-around";
      }
    case "between":
      switch (size) {
        case "sm":
          return "sm:justify-between";
        case "md":
          return "md:justify-between";
        case "lg":
          return "lg:justify-between";
        case "xl":
          return "xl:justify-between";
        case "2xl":
          return "2xl:justify-between";
        default:
          return "justify-between";
      }
    case "evenly":
      switch (size) {
        case "sm":
          return "sm:justify-evenly";
        case "md":
          return "md:justify-evenly";
        case "lg":
          return "lg:justify-evenly";
        case "xl":
          return "xl:justify-evenly";
        case "2xl":
          return "2xl:justify-evenly";
        default:
          return "justify-evenly";
      }
  }
};
