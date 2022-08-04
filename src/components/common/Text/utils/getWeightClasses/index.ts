import { TextWeight } from "~/components/common/Text/types";
import { ScreenSize } from "~/types";

type Param = {
  weight?: TextWeight;
  size?: ScreenSize;
};

export const getWeightClasses = ({ weight, size }: Param) => {
  if (!weight) {
    return null;
  }

  switch (weight) {
    case "thin":
      switch (size) {
        case "sm":
          return "sm:font-thin";
        case "md":
          return "md:font-thin";
        case "lg":
          return "lg:font-thin";
        case "xl":
          return "xl:font-thin";
        case "2xl":
          return "2xl:font-thin";
        default:
          return "font-thin";
      }
    case "extralight":
      switch (size) {
        case "sm":
          return "sm:font-extralight";
        case "md":
          return "md:font-extralight";
        case "lg":
          return "lg:font-extralight";
        case "xl":
          return "xl:font-extralight";
        case "2xl":
          return "2xl:font-extralight";
        default:
          return "font-extralight";
      }
    case "light":
      switch (size) {
        case "sm":
          return "sm:font-light";
        case "md":
          return "md:font-light";
        case "lg":
          return "lg:font-light";
        case "xl":
          return "xl:font-light";
        case "2xl":
          return "2xl:font-light";
        default:
          return "font-light";
      }
    case "normal":
      switch (size) {
        case "sm":
          return "sm:font-normal";
        case "md":
          return "md:font-normal";
        case "lg":
          return "lg:font-normal";
        case "xl":
          return "xl:font-normal";
        case "2xl":
          return "2xl:font-normal";
        default:
          return "font-normal";
      }
    case "medium":
      switch (size) {
        case "sm":
          return "sm:font-medium";
        case "md":
          return "md:font-medium";
        case "lg":
          return "lg:font-medium";
        case "xl":
          return "xl:font-medium";
        case "2xl":
          return "2xl:font-medium";
        default:
          return "font-medium";
      }
    case "semibold":
      switch (size) {
        case "sm":
          return "sm:font-semibold";
        case "md":
          return "md:font-semibold";
        case "lg":
          return "lg:font-semibold";
        case "xl":
          return "xl:font-semibold";
        case "2xl":
          return "2xl:font-semibold";
        default:
          return "font-semibold";
      }
    case "bold":
      switch (size) {
        case "sm":
          return "sm:font-bold";
        case "md":
          return "md:font-bold";
        case "lg":
          return "lg:font-bold";
        case "xl":
          return "xl:font-bold";
        case "2xl":
          return "2xl:font-bold";
        default:
          return "font-bold";
      }
    case "extrabold":
      switch (size) {
        case "sm":
          return "sm:font-extrabold";
        case "md":
          return "md:font-extrabold";
        case "lg":
          return "lg:font-extrabold";
        case "xl":
          return "xl:font-extrabold";
        case "2xl":
          return "2xl:font-extrabold";
        default:
          return "font-extrabold";
      }
    case "black":
      switch (size) {
        case "sm":
          return "sm:font-black";
        case "md":
          return "md:font-black";
        case "lg":
          return "lg:font-black";
        case "xl":
          return "xl:font-black";
        case "2xl":
          return "2xl:font-black";
        default:
          return "font-black";
      }
  }
};
