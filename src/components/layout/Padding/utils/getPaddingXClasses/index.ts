import { Spacing } from "~/common/spacing";
import { ScreenSize } from "~/types";
import { isNullOrUndefined } from "~/utils/isNullOrUndefined";

type Param = {
  space?: Spacing;
  size?: ScreenSize;
};

export const getPaddingXClasses = ({ space, size }: Param) => {
  if (isNullOrUndefined(space)) {
    return null;
  }

  switch (space) {
    case 0:
      switch (size) {
        case "sm":
          return "sm:px-0";
        case "md":
          return "md:px-0";
        case "lg":
          return "lg:px-0";
        case "xl":
          return "xl:px-0";
        case "2xl":
          return "2xl:px-0";
        default:
          return "px-0";
      }
    case 0.5:
      switch (size) {
        case "sm":
          return "sm:px-0.5";
        case "md":
          return "md:px-0.5";
        case "lg":
          return "lg:px-0.5";
        case "xl":
          return "xl:px-0.5";
        case "2xl":
          return "2xl:px-0.5";
        default:
          return "px-0.5";
      }
    case 1:
      switch (size) {
        case "sm":
          return "sm:px-1";
        case "md":
          return "md:px-1";
        case "lg":
          return "lg:px-1";
        case "xl":
          return "xl:px-1";
        case "2xl":
          return "2xl:px-1";
        default:
          return "px-1";
      }
    case 1.5:
      switch (size) {
        case "sm":
          return "sm:px-1.5";
        case "md":
          return "md:px-1.5";
        case "lg":
          return "lg:px-1.5";
        case "xl":
          return "xl:px-1.5";
        case "2xl":
          return "2xl:px-1.5";
        default:
          return "px-1.5";
      }
    case 2:
      switch (size) {
        case "sm":
          return "sm:px-2";
        case "md":
          return "md:px-2";
        case "lg":
          return "lg:px-2";
        case "xl":
          return "xl:px-2";
        case "2xl":
          return "2xl:px-2";
        default:
          return "px-2";
      }
    case 2.5:
      switch (size) {
        case "sm":
          return "sm:px-2.5";
        case "md":
          return "md:px-2.5";
        case "lg":
          return "lg:px-2.5";
        case "xl":
          return "xl:px-2.5";
        case "2xl":
          return "2xl:px-2.5";
        default:
          return "px-2.5";
      }
    case 3:
      switch (size) {
        case "sm":
          return "sm:px-3";
        case "md":
          return "md:px-3";
        case "lg":
          return "lg:px-3";
        case "xl":
          return "xl:px-3";
        case "2xl":
          return "2xl:px-3";
        default:
          return "px-3";
      }
    case 3.5:
      switch (size) {
        case "sm":
          return "sm:px-3.5";
        case "md":
          return "md:px-3.5";
        case "lg":
          return "lg:px-3.5";
        case "xl":
          return "xl:px-3.5";
        case "2xl":
          return "2xl:px-3.5";
        default:
          return "px-3.5";
      }
    case 4:
      switch (size) {
        case "sm":
          return "sm:px-4";
        case "md":
          return "md:px-4";
        case "lg":
          return "lg:px-4";
        case "xl":
          return "xl:px-4";
        case "2xl":
          return "2xl:px-4";
        default:
          return "px-4";
      }
    case 5:
      switch (size) {
        case "sm":
          return "sm:px-5";
        case "md":
          return "md:px-5";
        case "lg":
          return "lg:px-5";
        case "xl":
          return "xl:px-5";
        case "2xl":
          return "2xl:px-5";
        default:
          return "px-5";
      }
    case 6:
      switch (size) {
        case "sm":
          return "sm:px-6";
        case "md":
          return "md:px-6";
        case "lg":
          return "lg:px-6";
        case "xl":
          return "xl:px-6";
        case "2xl":
          return "2xl:px-6";
        default:
          return "px-6";
      }
    case 7:
      switch (size) {
        case "sm":
          return "sm:px-7";
        case "md":
          return "md:px-7";
        case "lg":
          return "lg:px-7";
        case "xl":
          return "xl:px-7";
        case "2xl":
          return "2xl:px-7";
        default:
          return "px-7";
      }
    case 8:
      switch (size) {
        case "sm":
          return "sm:px-8";
        case "md":
          return "md:px-8";
        case "lg":
          return "lg:px-8";
        case "xl":
          return "xl:px-8";
        case "2xl":
          return "2xl:px-8";
        default:
          return "px-8";
      }
    case 9:
      switch (size) {
        case "sm":
          return "sm:px-9";
        case "md":
          return "md:px-9";
        case "lg":
          return "lg:px-9";
        case "xl":
          return "xl:px-9";
        case "2xl":
          return "2xl:px-9";
        default:
          return "px-9";
      }
    case 10:
      switch (size) {
        case "sm":
          return "sm:px-10";
        case "md":
          return "md:px-10";
        case "lg":
          return "lg:px-10";
        case "xl":
          return "xl:px-10";
        case "2xl":
          return "2xl:px-10";
        default:
          return "px-10";
      }
    case 11:
      switch (size) {
        case "sm":
          return "sm:px-11";
        case "md":
          return "md:px-11";
        case "lg":
          return "lg:px-11";
        case "xl":
          return "xl:px-11";
        case "2xl":
          return "2xl:px-11";
        default:
          return "px-11";
      }
    case 12:
      switch (size) {
        case "sm":
          return "sm:px-12";
        case "md":
          return "md:px-12";
        case "lg":
          return "lg:px-12";
        case "xl":
          return "xl:px-12";
        case "2xl":
          return "2xl:px-12";
        default:
          return "px-12";
      }
    case 14:
      switch (size) {
        case "sm":
          return "sm:px-14";
        case "md":
          return "md:px-14";
        case "lg":
          return "lg:px-14";
        case "xl":
          return "xl:px-14";
        case "2xl":
          return "2xl:px-14";
        default:
          return "px-14";
      }
    case 16:
      switch (size) {
        case "sm":
          return "sm:px-16";
        case "md":
          return "md:px-16";
        case "lg":
          return "lg:px-16";
        case "xl":
          return "xl:px-16";
        case "2xl":
          return "2xl:px-16";
        default:
          return "px-16";
      }
    case 20:
      switch (size) {
        case "sm":
          return "sm:px-20";
        case "md":
          return "md:px-20";
        case "lg":
          return "lg:px-20";
        case "xl":
          return "xl:px-20";
        case "2xl":
          return "2xl:px-20";
        default:
          return "px-20";
      }
    case 24:
      switch (size) {
        case "sm":
          return "sm:px-24";
        case "md":
          return "md:px-24";
        case "lg":
          return "lg:px-24";
        case "xl":
          return "xl:px-24";
        case "2xl":
          return "2xl:px-24";
        default:
          return "px-24";
      }
    case 28:
      switch (size) {
        case "sm":
          return "sm:px-28";
        case "md":
          return "md:px-28";
        case "lg":
          return "lg:px-28";
        case "xl":
          return "xl:px-28";
        case "2xl":
          return "2xl:px-28";
        default:
          return "px-28";
      }
    case 32:
      switch (size) {
        case "sm":
          return "sm:px-32";
        case "md":
          return "md:px-32";
        case "lg":
          return "lg:px-32";
        case "xl":
          return "xl:px-32";
        case "2xl":
          return "2xl:px-32";
        default:
          return "px-32";
      }
    case 36:
      switch (size) {
        case "sm":
          return "sm:px-36";
        case "md":
          return "md:px-36";
        case "lg":
          return "lg:px-36";
        case "xl":
          return "xl:px-36";
        case "2xl":
          return "2xl:px-36";
        default:
          return "px-36";
      }
    case 40:
      switch (size) {
        case "sm":
          return "sm:px-40";
        case "md":
          return "md:px-40";
        case "lg":
          return "lg:px-40";
        case "xl":
          return "xl:px-40";
        case "2xl":
          return "2xl:px-40";
        default:
          return "px-40";
      }
    case 44:
      switch (size) {
        case "sm":
          return "sm:px-44";
        case "md":
          return "md:px-44";
        case "lg":
          return "lg:px-44";
        case "xl":
          return "xl:px-44";
        case "2xl":
          return "2xl:px-44";
        default:
          return "px-44";
      }
    case 48:
      switch (size) {
        case "sm":
          return "sm:px-48";
        case "md":
          return "md:px-48";
        case "lg":
          return "lg:px-48";
        case "xl":
          return "xl:px-48";
        case "2xl":
          return "2xl:px-48";
        default:
          return "px-48";
      }
    case 52:
      switch (size) {
        case "sm":
          return "sm:px-52";
        case "md":
          return "md:px-52";
        case "lg":
          return "lg:px-52";
        case "xl":
          return "xl:px-52";
        case "2xl":
          return "2xl:px-52";
        default:
          return "px-52";
      }
    case 56:
      switch (size) {
        case "sm":
          return "sm:px-56";
        case "md":
          return "md:px-56";
        case "lg":
          return "lg:px-56";
        case "xl":
          return "xl:px-56";
        case "2xl":
          return "2xl:px-56";
        default:
          return "px-56";
      }
    case 60:
      switch (size) {
        case "sm":
          return "sm:px-60";
        case "md":
          return "md:px-60";
        case "lg":
          return "lg:px-60";
        case "xl":
          return "xl:px-60";
        case "2xl":
          return "2xl:px-60";
        default:
          return "px-60";
      }
    case 64:
      switch (size) {
        case "sm":
          return "sm:px-64";
        case "md":
          return "md:px-64";
        case "lg":
          return "lg:px-64";
        case "xl":
          return "xl:px-64";
        case "2xl":
          return "2xl:px-64";
        default:
          return "px-64";
      }
    case 72:
      switch (size) {
        case "sm":
          return "sm:px-72";
        case "md":
          return "md:px-72";
        case "lg":
          return "lg:px-72";
        case "xl":
          return "xl:px-72";
        case "2xl":
          return "2xl:px-72";
        default:
          return "px-72";
      }
    case 80:
      switch (size) {
        case "sm":
          return "sm:px-80";
        case "md":
          return "md:px-80";
        case "lg":
          return "lg:px-80";
        case "xl":
          return "xl:px-80";
        case "2xl":
          return "2xl:px-80";
        default:
          return "px-80";
      }
    case 96:
      switch (size) {
        case "sm":
          return "sm:px-96";
        case "md":
          return "md:px-96";
        case "lg":
          return "lg:px-96";
        case "xl":
          return "xl:px-96";
        case "2xl":
          return "2xl:px-96";
        default:
          return "px-96";
      }
  }
};
