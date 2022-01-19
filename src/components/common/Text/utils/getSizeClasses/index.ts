import { TextSize } from "~/components/common/Text/types";
import { ScreenSize } from "~/types";

type Param = {
  fontSize?: TextSize;
  size?: ScreenSize;
};

export const getSizeClasses = ({ fontSize, size }: Param) => {
  if (!fontSize) {
    return null;
  }

  switch (fontSize) {
    case "xs":
      switch (size) {
        case "sm":
          return "sm:text-xs";
        case "md":
          return "md:text-xs";
        case "lg":
          return "lg:text-xs";
        case "xl":
          return "xl:text-xs";
        case "2xl":
          return "2xl:text-xs";
        default:
          return "text-xs";
      }
    case "sm":
      switch (size) {
        case "sm":
          return "sm:text-sm";
        case "md":
          return "md:text-sm";
        case "lg":
          return "lg:text-sm";
        case "xl":
          return "xl:text-sm";
        case "2xl":
          return "2xl:text-sm";
        default:
          return "text-sm";
      }
    case "base":
      switch (size) {
        case "sm":
          return "sm:text-base";
        case "md":
          return "md:text-base";
        case "lg":
          return "lg:text-base";
        case "xl":
          return "xl:text-base";
        case "2xl":
          return "2xl:text-base";
        default:
          return "text-base";
      }
    case "lg":
      switch (size) {
        case "sm":
          return "sm:text-lg";
        case "md":
          return "md:text-lg";
        case "lg":
          return "lg:text-lg";
        case "xl":
          return "xl:text-lg";
        case "2xl":
          return "2xl:text-lg";
        default:
          return "text-lg";
      }
    case "xl":
      switch (size) {
        case "sm":
          return "sm:text-xl";
        case "md":
          return "md:text-xl";
        case "lg":
          return "lg:text-xl";
        case "xl":
          return "xl:text-xl";
        case "2xl":
          return "2xl:text-xl";
        default:
          return "text-xl";
      }
    case "2xl":
      switch (size) {
        case "sm":
          return "sm:text-2xl";
        case "md":
          return "md:text-2xl";
        case "lg":
          return "lg:text-2xl";
        case "xl":
          return "xl:text-2xl";
        case "2xl":
          return "2xl:text-2xl";
        default:
          return "text-2xl";
      }
    case "3xl":
      switch (size) {
        case "sm":
          return "sm:text-3xl";
        case "md":
          return "md:text-3xl";
        case "lg":
          return "lg:text-3xl";
        case "xl":
          return "xl:text-3xl";
        case "2xl":
          return "2xl:text-3xl";
        default:
          return "text-3xl";
      }
    case "4xl":
      switch (size) {
        case "sm":
          return "sm:text-4xl";
        case "md":
          return "md:text-4xl";
        case "lg":
          return "lg:text-4xl";
        case "xl":
          return "xl:text-4xl";
        case "2xl":
          return "2xl:text-4xl";
        default:
          return "text-4xl";
      }
    case "5xl":
      switch (size) {
        case "sm":
          return "sm:text-5xl";
        case "md":
          return "md:text-5xl";
        case "lg":
          return "lg:text-5xl";
        case "xl":
          return "xl:text-5xl";
        case "2xl":
          return "2xl:text-5xl";
        default:
          return "text-5xl";
      }
    case "6xl":
      switch (size) {
        case "sm":
          return "sm:text-6xl";
        case "md":
          return "md:text-6xl";
        case "lg":
          return "lg:text-6xl";
        case "xl":
          return "xl:text-6xl";
        case "2xl":
          return "2xl:text-6xl";
        default:
          return "text-6xl";
      }
    case "7xl":
      switch (size) {
        case "sm":
          return "sm:text-7xl";
        case "md":
          return "md:text-7xl";
        case "lg":
          return "lg:text-7xl";
        case "xl":
          return "xl:text-7xl";
        case "2xl":
          return "2xl:text-7xl";
        default:
          return "text-7xl";
      }
    case "8xl":
      switch (size) {
        case "sm":
          return "sm:text-8xl";
        case "md":
          return "md:text-8xl";
        case "lg":
          return "lg:text-8xl";
        case "xl":
          return "xl:text-8xl";
        case "2xl":
          return "2xl:text-8xl";
        default:
          return "text-8xl";
      }
    case "9xl":
      switch (size) {
        case "sm":
          return "sm:text-9xl";
        case "md":
          return "md:text-9xl";
        case "lg":
          return "lg:text-9xl";
        case "xl":
          return "xl:text-9xl";
        case "2xl":
          return "2xl:text-9xl";
        default:
          return "text-9xl";
      }
  }
};
