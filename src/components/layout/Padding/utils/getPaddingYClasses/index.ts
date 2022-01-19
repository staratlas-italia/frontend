import { Spacing } from "~/common/spacing";
import { ScreenSize } from "~/types";
import { isNullOrUndefined } from "~/utils/isNullOrUndefined";

type Param = {
  space?: Spacing;
  size?: ScreenSize;
};

export const getPaddingYClasses = ({ space, size }: Param) => {
  if (isNullOrUndefined(space)) {
    return null;
  }

  switch (space) {
    case 0:
      switch (size) {
        case "sm":
          return "sm:py-0";
        case "md":
          return "md:py-0";
        case "lg":
          return "lg:py-0";
        case "xl":
          return "xl:py-0";
        case "2xl":
          return "2xl:py-0";
        default:
          return "py-0";
      }
    case 0.5:
      switch (size) {
        case "sm":
          return "sm:py-0.5";
        case "md":
          return "md:py-0.5";
        case "lg":
          return "lg:py-0.5";
        case "xl":
          return "xl:py-0.5";
        case "2xl":
          return "2xl:py-0.5";
        default:
          return "py-0.5";
      }
    case 1:
      switch (size) {
        case "sm":
          return "sm:py-1";
        case "md":
          return "md:py-1";
        case "lg":
          return "lg:py-1";
        case "xl":
          return "xl:py-1";
        case "2xl":
          return "2xl:py-1";
        default:
          return "py-1";
      }
    case 1.5:
      switch (size) {
        case "sm":
          return "sm:py-1.5";
        case "md":
          return "md:py-1.5";
        case "lg":
          return "lg:py-1.5";
        case "xl":
          return "xl:py-1.5";
        case "2xl":
          return "2xl:py-1.5";
        default:
          return "py-1.5";
      }
    case 2:
      switch (size) {
        case "sm":
          return "sm:py-2";
        case "md":
          return "md:py-2";
        case "lg":
          return "lg:py-2";
        case "xl":
          return "xl:py-2";
        case "2xl":
          return "2xl:py-2";
        default:
          return "py-2";
      }
    case 2.5:
      switch (size) {
        case "sm":
          return "sm:py-2.5";
        case "md":
          return "md:py-2.5";
        case "lg":
          return "lg:py-2.5";
        case "xl":
          return "xl:py-2.5";
        case "2xl":
          return "2xl:py-2.5";
        default:
          return "py-2.5";
      }
    case 3:
      switch (size) {
        case "sm":
          return "sm:py-3";
        case "md":
          return "md:py-3";
        case "lg":
          return "lg:py-3";
        case "xl":
          return "xl:py-3";
        case "2xl":
          return "2xl:py-3";
        default:
          return "py-3";
      }
    case 3.5:
      switch (size) {
        case "sm":
          return "sm:py-3.5";
        case "md":
          return "md:py-3.5";
        case "lg":
          return "lg:py-3.5";
        case "xl":
          return "xl:py-3.5";
        case "2xl":
          return "2xl:py-3.5";
        default:
          return "py-3.5";
      }
    case 4:
      switch (size) {
        case "sm":
          return "sm:py-4";
        case "md":
          return "md:py-4";
        case "lg":
          return "lg:py-4";
        case "xl":
          return "xl:py-4";
        case "2xl":
          return "2xl:py-4";
        default:
          return "py-4";
      }
    case 5:
      switch (size) {
        case "sm":
          return "sm:py-5";
        case "md":
          return "md:py-5";
        case "lg":
          return "lg:py-5";
        case "xl":
          return "xl:py-5";
        case "2xl":
          return "2xl:py-5";
        default:
          return "py-5";
      }
    case 6:
      switch (size) {
        case "sm":
          return "sm:py-6";
        case "md":
          return "md:py-6";
        case "lg":
          return "lg:py-6";
        case "xl":
          return "xl:py-6";
        case "2xl":
          return "2xl:py-6";
        default:
          return "py-6";
      }
    case 7:
      switch (size) {
        case "sm":
          return "sm:py-7";
        case "md":
          return "md:py-7";
        case "lg":
          return "lg:py-7";
        case "xl":
          return "xl:py-7";
        case "2xl":
          return "2xl:py-7";
        default:
          return "py-7";
      }
    case 8:
      switch (size) {
        case "sm":
          return "sm:py-8";
        case "md":
          return "md:py-8";
        case "lg":
          return "lg:py-8";
        case "xl":
          return "xl:py-8";
        case "2xl":
          return "2xl:py-8";
        default:
          return "py-8";
      }
    case 9:
      switch (size) {
        case "sm":
          return "sm:py-9";
        case "md":
          return "md:py-9";
        case "lg":
          return "lg:py-9";
        case "xl":
          return "xl:py-9";
        case "2xl":
          return "2xl:py-9";
        default:
          return "py-9";
      }
    case 10:
      switch (size) {
        case "sm":
          return "sm:py-10";
        case "md":
          return "md:py-10";
        case "lg":
          return "lg:py-10";
        case "xl":
          return "xl:py-10";
        case "2xl":
          return "2xl:py-10";
        default:
          return "py-10";
      }
    case 11:
      switch (size) {
        case "sm":
          return "sm:py-11";
        case "md":
          return "md:py-11";
        case "lg":
          return "lg:py-11";
        case "xl":
          return "xl:py-11";
        case "2xl":
          return "2xl:py-11";
        default:
          return "py-11";
      }
    case 12:
      switch (size) {
        case "sm":
          return "sm:py-12";
        case "md":
          return "md:py-12";
        case "lg":
          return "lg:py-12";
        case "xl":
          return "xl:py-12";
        case "2xl":
          return "2xl:py-12";
        default:
          return "py-12";
      }
    case 14:
      switch (size) {
        case "sm":
          return "sm:py-14";
        case "md":
          return "md:py-14";
        case "lg":
          return "lg:py-14";
        case "xl":
          return "xl:py-14";
        case "2xl":
          return "2xl:py-14";
        default:
          return "py-14";
      }
    case 16:
      switch (size) {
        case "sm":
          return "sm:py-16";
        case "md":
          return "md:py-16";
        case "lg":
          return "lg:py-16";
        case "xl":
          return "xl:py-16";
        case "2xl":
          return "2xl:py-16";
        default:
          return "py-16";
      }
    case 20:
      switch (size) {
        case "sm":
          return "sm:py-20";
        case "md":
          return "md:py-20";
        case "lg":
          return "lg:py-20";
        case "xl":
          return "xl:py-20";
        case "2xl":
          return "2xl:py-20";
        default:
          return "py-20";
      }
    case 24:
      switch (size) {
        case "sm":
          return "sm:py-24";
        case "md":
          return "md:py-24";
        case "lg":
          return "lg:py-24";
        case "xl":
          return "xl:py-24";
        case "2xl":
          return "2xl:py-24";
        default:
          return "py-24";
      }
    case 28:
      switch (size) {
        case "sm":
          return "sm:py-28";
        case "md":
          return "md:py-28";
        case "lg":
          return "lg:py-28";
        case "xl":
          return "xl:py-28";
        case "2xl":
          return "2xl:py-28";
        default:
          return "py-28";
      }
    case 32:
      switch (size) {
        case "sm":
          return "sm:py-32";
        case "md":
          return "md:py-32";
        case "lg":
          return "lg:py-32";
        case "xl":
          return "xl:py-32";
        case "2xl":
          return "2xl:py-32";
        default:
          return "py-32";
      }
    case 36:
      switch (size) {
        case "sm":
          return "sm:py-36";
        case "md":
          return "md:py-36";
        case "lg":
          return "lg:py-36";
        case "xl":
          return "xl:py-36";
        case "2xl":
          return "2xl:py-36";
        default:
          return "py-36";
      }
    case 40:
      switch (size) {
        case "sm":
          return "sm:py-40";
        case "md":
          return "md:py-40";
        case "lg":
          return "lg:py-40";
        case "xl":
          return "xl:py-40";
        case "2xl":
          return "2xl:py-40";
        default:
          return "py-40";
      }
    case 44:
      switch (size) {
        case "sm":
          return "sm:py-44";
        case "md":
          return "md:py-44";
        case "lg":
          return "lg:py-44";
        case "xl":
          return "xl:py-44";
        case "2xl":
          return "2xl:py-44";
        default:
          return "py-44";
      }
    case 48:
      switch (size) {
        case "sm":
          return "sm:py-48";
        case "md":
          return "md:py-48";
        case "lg":
          return "lg:py-48";
        case "xl":
          return "xl:py-48";
        case "2xl":
          return "2xl:py-48";
        default:
          return "py-48";
      }
    case 52:
      switch (size) {
        case "sm":
          return "sm:py-52";
        case "md":
          return "md:py-52";
        case "lg":
          return "lg:py-52";
        case "xl":
          return "xl:py-52";
        case "2xl":
          return "2xl:py-52";
        default:
          return "py-52";
      }
    case 56:
      switch (size) {
        case "sm":
          return "sm:py-56";
        case "md":
          return "md:py-56";
        case "lg":
          return "lg:py-56";
        case "xl":
          return "xl:py-56";
        case "2xl":
          return "2xl:py-56";
        default:
          return "py-56";
      }
    case 60:
      switch (size) {
        case "sm":
          return "sm:py-60";
        case "md":
          return "md:py-60";
        case "lg":
          return "lg:py-60";
        case "xl":
          return "xl:py-60";
        case "2xl":
          return "2xl:py-60";
        default:
          return "py-60";
      }
    case 64:
      switch (size) {
        case "sm":
          return "sm:py-64";
        case "md":
          return "md:py-64";
        case "lg":
          return "lg:py-64";
        case "xl":
          return "xl:py-64";
        case "2xl":
          return "2xl:py-64";
        default:
          return "py-64";
      }
    case 72:
      switch (size) {
        case "sm":
          return "sm:py-72";
        case "md":
          return "md:py-72";
        case "lg":
          return "lg:py-72";
        case "xl":
          return "xl:py-72";
        case "2xl":
          return "2xl:py-72";
        default:
          return "py-72";
      }
    case 80:
      switch (size) {
        case "sm":
          return "sm:py-80";
        case "md":
          return "md:py-80";
        case "lg":
          return "lg:py-80";
        case "xl":
          return "xl:py-80";
        case "2xl":
          return "2xl:py-80";
        default:
          return "py-80";
      }
    case 96:
      switch (size) {
        case "sm":
          return "sm:py-96";
        case "md":
          return "md:py-96";
        case "lg":
          return "lg:py-96";
        case "xl":
          return "xl:py-96";
        case "2xl":
          return "2xl:py-96";
        default:
          return "py-96";
      }
  }
};
