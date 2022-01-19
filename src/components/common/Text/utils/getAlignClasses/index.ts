import { TextAlignment } from "~/components/common/Text/types";
import { ScreenSize } from "~/types";

type Param = {
  align?: TextAlignment;
  size?: ScreenSize;
};

export const getAlignClasses = ({ align, size }: Param) => {
  if (!align) {
    return null;
  }

  switch (align) {
    case "center":
      switch (size) {
        case "sm":
          return "sm:text-center";
        case "md":
          return "md:text-center";
        case "lg":
          return "lg:text-center";
        case "xl":
          return "xl:text-center";
        case "2xl":
          return "2xl:text-center";
        default:
          return "text-center";
      }
    case "left":
      switch (size) {
        case "sm":
          return "sm:text-left";
        case "md":
          return "md:text-left";
        case "lg":
          return "lg:text-left";
        case "xl":
          return "xl:text-left";
        case "2xl":
          return "2xl:text-left";
        default:
          return "text-left";
      }
    case "right":
      switch (size) {
        case "sm":
          return "sm:text-right";
        case "md":
          return "md:text-right";
        case "lg":
          return "lg:text-right";
        case "xl":
          return "xl:text-right";
        case "2xl":
          return "2xl:text-right";
        default:
          return "text-right";
      }
    case "justify":
      switch (size) {
        case "sm":
          return "sm:text-justify";
        case "md":
          return "md:text-justify";
        case "lg":
          return "lg:text-justify";
        case "xl":
          return "xl:text-justify";
        case "2xl":
          return "2xl:text-justify";
        default:
          return "text-justify";
      }
  }
};
