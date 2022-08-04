import { TextOpacity } from "~/components/common/Text/types";
import { ScreenSize } from "~/types";
import { isNullOrUndefined } from "~/utils/isNullOrUndefined";

type Param = {
  opacity?: TextOpacity;
  size?: ScreenSize;
};

export const getOpacityClasses = ({ opacity, size }: Param) => {
  if (isNullOrUndefined(opacity)) {
    return null;
  }

  switch (opacity) {
    case 0:
      switch (size) {
        case "sm":
          return "sm:text-opacity-0";
        case "md":
          return "md:text-opacity-0";
        case "lg":
          return "lg:text-opacity-0";
        case "xl":
          return "xl:text-opacity-0";
        case "2xl":
          return "2xl:text-opacity-0";
        default:
          return "text-opacity-0";
      }
    case 5:
      switch (size) {
        case "sm":
          return "sm:text-opacity-5";
        case "md":
          return "md:text-opacity-5";
        case "lg":
          return "lg:text-opacity-5";
        case "xl":
          return "xl:text-opacity-5";
        case "2xl":
          return "2xl:text-opacity-5";
        default:
          return "text-opacity-5";
      }
    case 10:
      switch (size) {
        case "sm":
          return "sm:text-opacity-10";
        case "md":
          return "md:text-opacity-10";
        case "lg":
          return "lg:text-opacity-10";
        case "xl":
          return "xl:text-opacity-10";
        case "2xl":
          return "2xl:text-opacity-10";
        default:
          return "text-opacity-10";
      }
    case 20:
      switch (size) {
        case "sm":
          return "sm:text-opacity-20";
        case "md":
          return "md:text-opacity-20";
        case "lg":
          return "lg:text-opacity-20";
        case "xl":
          return "xl:text-opacity-20";
        case "2xl":
          return "2xl:text-opacity-20";
        default:
          return "text-opacity-20";
      }
    case 25:
      switch (size) {
        case "sm":
          return "sm:text-opacity-25";
        case "md":
          return "md:text-opacity-25";
        case "lg":
          return "lg:text-opacity-25";
        case "xl":
          return "xl:text-opacity-25";
        case "2xl":
          return "2xl:text-opacity-25";
        default:
          return "text-opacity-25";
      }
    case 30:
      switch (size) {
        case "sm":
          return "sm:text-opacity-30";
        case "md":
          return "md:text-opacity-30";
        case "lg":
          return "lg:text-opacity-30";
        case "xl":
          return "xl:text-opacity-30";
        case "2xl":
          return "2xl:text-opacity-30";
        default:
          return "text-opacity-30";
      }
    case 40:
      switch (size) {
        case "sm":
          return "sm:text-opacity-40";
        case "md":
          return "md:text-opacity-40";
        case "lg":
          return "lg:text-opacity-40";
        case "xl":
          return "xl:text-opacity-40";
        case "2xl":
          return "2xl:text-opacity-40";
        default:
          return "text-opacity-40";
      }
    case 50:
      switch (size) {
        case "sm":
          return "sm:text-opacity-50";
        case "md":
          return "md:text-opacity-50";
        case "lg":
          return "lg:text-opacity-50";
        case "xl":
          return "xl:text-opacity-50";
        case "2xl":
          return "2xl:text-opacity-50";
        default:
          return "text-opacity-50";
      }
    case 60:
      switch (size) {
        case "sm":
          return "sm:text-opacity-60";
        case "md":
          return "md:text-opacity-60";
        case "lg":
          return "lg:text-opacity-60";
        case "xl":
          return "xl:text-opacity-60";
        case "2xl":
          return "2xl:text-opacity-60";
        default:
          return "text-opacity-60";
      }
    case 70:
      switch (size) {
        case "sm":
          return "sm:text-opacity-70";
        case "md":
          return "md:text-opacity-70";
        case "lg":
          return "lg:text-opacity-70";
        case "xl":
          return "xl:text-opacity-70";
        case "2xl":
          return "2xl:text-opacity-70";
        default:
          return "text-opacity-70";
      }
    case 75:
      switch (size) {
        case "sm":
          return "sm:text-opacity-75";
        case "md":
          return "md:text-opacity-75";
        case "lg":
          return "lg:text-opacity-75";
        case "xl":
          return "xl:text-opacity-75";
        case "2xl":
          return "2xl:text-opacity-75";
        default:
          return "text-opacity-75";
      }
    case 80:
      switch (size) {
        case "sm":
          return "sm:text-opacity-80";
        case "md":
          return "md:text-opacity-80";
        case "lg":
          return "lg:text-opacity-80";
        case "xl":
          return "xl:text-opacity-80";
        case "2xl":
          return "2xl:text-opacity-80";
        default:
          return "text-opacity-80";
      }
    case 90:
      switch (size) {
        case "sm":
          return "sm:text-opacity-90";
        case "md":
          return "md:text-opacity-90";
        case "lg":
          return "lg:text-opacity-90";
        case "xl":
          return "xl:text-opacity-90";
        case "2xl":
          return "2xl:text-opacity-90";
        default:
          return "text-opacity-90";
      }
    case 95:
      switch (size) {
        case "sm":
          return "sm:text-opacity-95";
        case "md":
          return "md:text-opacity-95";
        case "lg":
          return "lg:text-opacity-95";
        case "xl":
          return "xl:text-opacity-95";
        case "2xl":
          return "2xl:text-opacity-95";
        default:
          return "text-opacity-95";
      }
  }
};
