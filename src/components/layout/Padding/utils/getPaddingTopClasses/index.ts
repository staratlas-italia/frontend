import { Spacing } from "~/common/spacing";
import { ScreenSize } from "~/types";
import { isNullOrUndefined } from "~/utils/isNullOrUndefined";

type Param = {
  space?: Spacing;
  size?: ScreenSize;
};

export const getPaddingTopClasses = ({ space, size }: Param) => {
  if (isNullOrUndefined(space)) {
    return null;
  }

  switch (space) {
    case 0:
      switch (size) {
        case "sm":
          return "sm:pt-0";
        case "md":
          return "md:pt-0";
        case "lg":
          return "lg:pt-0";
        case "xl":
          return "xl:pt-0";
        case "2xl":
          return "2xl:pt-0";
        default:
          return "pt-0";
      }
    case 0.5:
      switch (size) {
        case "sm":
          return "sm:pt-0.5";
        case "md":
          return "md:pt-0.5";
        case "lg":
          return "lg:pt-0.5";
        case "xl":
          return "xl:pt-0.5";
        case "2xl":
          return "2xl:pt-0.5";
        default:
          return "pt-0.5";
      }
    case 1:
      switch (size) {
        case "sm":
          return "sm:pt-1";
        case "md":
          return "md:pt-1";
        case "lg":
          return "lg:pt-1";
        case "xl":
          return "xl:pt-1";
        case "2xl":
          return "2xl:pt-1";
        default:
          return "pt-1";
      }
    case 1.5:
      switch (size) {
        case "sm":
          return "sm:pt-1.5";
        case "md":
          return "md:pt-1.5";
        case "lg":
          return "lg:pt-1.5";
        case "xl":
          return "xl:pt-1.5";
        case "2xl":
          return "2xl:pt-1.5";
        default:
          return "pt-1.5";
      }
    case 2:
      switch (size) {
        case "sm":
          return "sm:pt-2";
        case "md":
          return "md:pt-2";
        case "lg":
          return "lg:pt-2";
        case "xl":
          return "xl:pt-2";
        case "2xl":
          return "2xl:pt-2";
        default:
          return "pt-2";
      }
    case 2.5:
      switch (size) {
        case "sm":
          return "sm:pt-2.5";
        case "md":
          return "md:pt-2.5";
        case "lg":
          return "lg:pt-2.5";
        case "xl":
          return "xl:pt-2.5";
        case "2xl":
          return "2xl:pt-2.5";
        default:
          return "pt-2.5";
      }
    case 3:
      switch (size) {
        case "sm":
          return "sm:pt-3";
        case "md":
          return "md:pt-3";
        case "lg":
          return "lg:pt-3";
        case "xl":
          return "xl:pt-3";
        case "2xl":
          return "2xl:pt-3";
        default:
          return "pt-3";
      }
    case 3.5:
      switch (size) {
        case "sm":
          return "sm:pt-3.5";
        case "md":
          return "md:pt-3.5";
        case "lg":
          return "lg:pt-3.5";
        case "xl":
          return "xl:pt-3.5";
        case "2xl":
          return "2xl:pt-3.5";
        default:
          return "pt-3.5";
      }
    case 4:
      switch (size) {
        case "sm":
          return "sm:pt-4";
        case "md":
          return "md:pt-4";
        case "lg":
          return "lg:pt-4";
        case "xl":
          return "xl:pt-4";
        case "2xl":
          return "2xl:pt-4";
        default:
          return "pt-4";
      }
    case 5:
      switch (size) {
        case "sm":
          return "sm:pt-5";
        case "md":
          return "md:pt-5";
        case "lg":
          return "lg:pt-5";
        case "xl":
          return "xl:pt-5";
        case "2xl":
          return "2xl:pt-5";
        default:
          return "pt-5";
      }
    case 6:
      switch (size) {
        case "sm":
          return "sm:pt-6";
        case "md":
          return "md:pt-6";
        case "lg":
          return "lg:pt-6";
        case "xl":
          return "xl:pt-6";
        case "2xl":
          return "2xl:pt-6";
        default:
          return "pt-6";
      }
    case 7:
      switch (size) {
        case "sm":
          return "sm:pt-7";
        case "md":
          return "md:pt-7";
        case "lg":
          return "lg:pt-7";
        case "xl":
          return "xl:pt-7";
        case "2xl":
          return "2xl:pt-7";
        default:
          return "pt-7";
      }
    case 8:
      switch (size) {
        case "sm":
          return "sm:pt-8";
        case "md":
          return "md:pt-8";
        case "lg":
          return "lg:pt-8";
        case "xl":
          return "xl:pt-8";
        case "2xl":
          return "2xl:pt-8";
        default:
          return "pt-8";
      }
    case 9:
      switch (size) {
        case "sm":
          return "sm:pt-9";
        case "md":
          return "md:pt-9";
        case "lg":
          return "lg:pt-9";
        case "xl":
          return "xl:pt-9";
        case "2xl":
          return "2xl:pt-9";
        default:
          return "pt-9";
      }
    case 10:
      switch (size) {
        case "sm":
          return "sm:pt-10";
        case "md":
          return "md:pt-10";
        case "lg":
          return "lg:pt-10";
        case "xl":
          return "xl:pt-10";
        case "2xl":
          return "2xl:pt-10";
        default:
          return "pt-10";
      }
    case 11:
      switch (size) {
        case "sm":
          return "sm:pt-11";
        case "md":
          return "md:pt-11";
        case "lg":
          return "lg:pt-11";
        case "xl":
          return "xl:pt-11";
        case "2xl":
          return "2xl:pt-11";
        default:
          return "pt-11";
      }
    case 12:
      switch (size) {
        case "sm":
          return "sm:pt-12";
        case "md":
          return "md:pt-12";
        case "lg":
          return "lg:pt-12";
        case "xl":
          return "xl:pt-12";
        case "2xl":
          return "2xl:pt-12";
        default:
          return "pt-12";
      }
    case 14:
      switch (size) {
        case "sm":
          return "sm:pt-14";
        case "md":
          return "md:pt-14";
        case "lg":
          return "lg:pt-14";
        case "xl":
          return "xl:pt-14";
        case "2xl":
          return "2xl:pt-14";
        default:
          return "pt-14";
      }
    case 16:
      switch (size) {
        case "sm":
          return "sm:pt-16";
        case "md":
          return "md:pt-16";
        case "lg":
          return "lg:pt-16";
        case "xl":
          return "xl:pt-16";
        case "2xl":
          return "2xl:pt-16";
        default:
          return "pt-16";
      }
    case 20:
      switch (size) {
        case "sm":
          return "sm:pt-20";
        case "md":
          return "md:pt-20";
        case "lg":
          return "lg:pt-20";
        case "xl":
          return "xl:pt-20";
        case "2xl":
          return "2xl:pt-20";
        default:
          return "pt-20";
      }
    case 24:
      switch (size) {
        case "sm":
          return "sm:pt-24";
        case "md":
          return "md:pt-24";
        case "lg":
          return "lg:pt-24";
        case "xl":
          return "xl:pt-24";
        case "2xl":
          return "2xl:pt-24";
        default:
          return "pt-24";
      }
    case 28:
      switch (size) {
        case "sm":
          return "sm:pt-28";
        case "md":
          return "md:pt-28";
        case "lg":
          return "lg:pt-28";
        case "xl":
          return "xl:pt-28";
        case "2xl":
          return "2xl:pt-28";
        default:
          return "pt-28";
      }
    case 32:
      switch (size) {
        case "sm":
          return "sm:pt-32";
        case "md":
          return "md:pt-32";
        case "lg":
          return "lg:pt-32";
        case "xl":
          return "xl:pt-32";
        case "2xl":
          return "2xl:pt-32";
        default:
          return "pt-32";
      }
    case 36:
      switch (size) {
        case "sm":
          return "sm:pt-36";
        case "md":
          return "md:pt-36";
        case "lg":
          return "lg:pt-36";
        case "xl":
          return "xl:pt-36";
        case "2xl":
          return "2xl:pt-36";
        default:
          return "pt-36";
      }
    case 40:
      switch (size) {
        case "sm":
          return "sm:pt-40";
        case "md":
          return "md:pt-40";
        case "lg":
          return "lg:pt-40";
        case "xl":
          return "xl:pt-40";
        case "2xl":
          return "2xl:pt-40";
        default:
          return "pt-40";
      }
    case 44:
      switch (size) {
        case "sm":
          return "sm:pt-44";
        case "md":
          return "md:pt-44";
        case "lg":
          return "lg:pt-44";
        case "xl":
          return "xl:pt-44";
        case "2xl":
          return "2xl:pt-44";
        default:
          return "pt-44";
      }
    case 48:
      switch (size) {
        case "sm":
          return "sm:pt-48";
        case "md":
          return "md:pt-48";
        case "lg":
          return "lg:pt-48";
        case "xl":
          return "xl:pt-48";
        case "2xl":
          return "2xl:pt-48";
        default:
          return "pt-48";
      }
    case 52:
      switch (size) {
        case "sm":
          return "sm:pt-52";
        case "md":
          return "md:pt-52";
        case "lg":
          return "lg:pt-52";
        case "xl":
          return "xl:pt-52";
        case "2xl":
          return "2xl:pt-52";
        default:
          return "pt-52";
      }
    case 56:
      switch (size) {
        case "sm":
          return "sm:pt-56";
        case "md":
          return "md:pt-56";
        case "lg":
          return "lg:pt-56";
        case "xl":
          return "xl:pt-56";
        case "2xl":
          return "2xl:pt-56";
        default:
          return "pt-56";
      }
    case 60:
      switch (size) {
        case "sm":
          return "sm:pt-60";
        case "md":
          return "md:pt-60";
        case "lg":
          return "lg:pt-60";
        case "xl":
          return "xl:pt-60";
        case "2xl":
          return "2xl:pt-60";
        default:
          return "pt-60";
      }
    case 64:
      switch (size) {
        case "sm":
          return "sm:pt-64";
        case "md":
          return "md:pt-64";
        case "lg":
          return "lg:pt-64";
        case "xl":
          return "xl:pt-64";
        case "2xl":
          return "2xl:pt-64";
        default:
          return "pt-64";
      }
    case 72:
      switch (size) {
        case "sm":
          return "sm:pt-72";
        case "md":
          return "md:pt-72";
        case "lg":
          return "lg:pt-72";
        case "xl":
          return "xl:pt-72";
        case "2xl":
          return "2xl:pt-72";
        default:
          return "pt-72";
      }
    case 80:
      switch (size) {
        case "sm":
          return "sm:pt-80";
        case "md":
          return "md:pt-80";
        case "lg":
          return "lg:pt-80";
        case "xl":
          return "xl:pt-80";
        case "2xl":
          return "2xl:pt-80";
        default:
          return "pt-80";
      }
    case 96:
      switch (size) {
        case "sm":
          return "sm:pt-96";
        case "md":
          return "md:pt-96";
        case "lg":
          return "lg:pt-96";
        case "xl":
          return "xl:pt-96";
        case "2xl":
          return "2xl:pt-96";
        default:
          return "pt-96";
      }
  }
};
