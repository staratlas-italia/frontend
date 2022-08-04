import { Wrap } from "~/components/layout/Flex/types";
import { ScreenSize } from "~/types";

type Param = {
  wrap?: Wrap;
  size?: ScreenSize;
};

export const getWrapClasses = ({ wrap, size }: Param) => {
  if (!wrap) {
    return null;
  }

  switch (wrap) {
    case "wrap":
      switch (size) {
        case "sm":
          return "sm:flex-wrap";
        case "md":
          return "md:flex-wrap";
        case "lg":
          return "lg:flex-wrap";
        case "xl":
          return "xl:flex-wrap";
        case "2xl":
          return "2xl:flex-wrap";
        default:
          return "flex-wrap";
      }
    case "wrap-reverse":
      switch (size) {
        case "sm":
          return "sm:flex-wrap-reverse";
        case "md":
          return "md:flex-wrap-reverse";
        case "lg":
          return "lg:flex-wrap-reverse";
        case "xl":
          return "xl:flex-wrap-reverse";
        case "2xl":
          return "2xl:flex-wrap-reverse";
        default:
          return "flex-wrap-reverse";
      }
    case "nowrap":
      switch (size) {
        case "sm":
          return "sm:flex-nowrap";
        case "md":
          return "md:flex-nowrap";
        case "lg":
          return "lg:flex-nowrap";
        case "xl":
          return "xl:flex-nowrap";
        case "2xl":
          return "2xl:flex-nowrap";
        default:
          return "flex-nowrap";
      }
  }
};
