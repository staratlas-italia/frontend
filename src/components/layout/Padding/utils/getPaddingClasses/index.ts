import { Spacing } from "~/common/spacing";
import { ScreenSize } from "~/types";
import { isNullOrUndefined } from "~/utils/isNullOrUndefined";

type Param = {
  space?: Spacing;
  size?: ScreenSize;
};

export const getPaddingClasses = ({ space, size }: Param) => {
  if (isNullOrUndefined(space)) {
    return null;
  }

  switch (space) {
    case 0:
      switch (size) {
        case "sm":
          return "sm:p-0";
        case "md":
          return "md:p-0";
        case "lg":
          return "lg:p-0";
        case "xl":
          return "xl:p-0";
        case "2xl":
          return "2xl:p-0";
        default:
          return "p-0";
      }
    case 0.5:
      switch (size) {
        case "sm":
          return "sm:p-0.5";
        case "md":
          return "md:p-0.5";
        case "lg":
          return "lg:p-0.5";
        case "xl":
          return "xl:p-0.5";
        case "2xl":
          return "2xl:p-0.5";
        default:
          return "p-0.5";
      }
    case 1:
      switch (size) {
        case "sm":
          return "sm:p-1";
        case "md":
          return "md:p-1";
        case "lg":
          return "lg:p-1";
        case "xl":
          return "xl:p-1";
        case "2xl":
          return "2xl:p-1";
        default:
          return "p-1";
      }
    case 1.5:
      switch (size) {
        case "sm":
          return "sm:p-1.5";
        case "md":
          return "md:p-1.5";
        case "lg":
          return "lg:p-1.5";
        case "xl":
          return "xl:p-1.5";
        case "2xl":
          return "2xl:p-1.5";
        default:
          return "p-1.5";
      }
    case 2:
      switch (size) {
        case "sm":
          return "sm:p-2";
        case "md":
          return "md:p-2";
        case "lg":
          return "lg:p-2";
        case "xl":
          return "xl:p-2";
        case "2xl":
          return "2xl:p-2";
        default:
          return "p-2";
      }
    case 2.5:
      switch (size) {
        case "sm":
          return "sm:p-2.5";
        case "md":
          return "md:p-2.5";
        case "lg":
          return "lg:p-2.5";
        case "xl":
          return "xl:p-2.5";
        case "2xl":
          return "2xl:p-2.5";
        default:
          return "p-2.5";
      }
    case 3:
      switch (size) {
        case "sm":
          return "sm:p-3";
        case "md":
          return "md:p-3";
        case "lg":
          return "lg:p-3";
        case "xl":
          return "xl:p-3";
        case "2xl":
          return "2xl:p-3";
        default:
          return "p-3";
      }
    case 3.5:
      switch (size) {
        case "sm":
          return "sm:p-3.5";
        case "md":
          return "md:p-3.5";
        case "lg":
          return "lg:p-3.5";
        case "xl":
          return "xl:p-3.5";
        case "2xl":
          return "2xl:p-3.5";
        default:
          return "p-3.5";
      }
    case 4:
      switch (size) {
        case "sm":
          return "sm:p-4";
        case "md":
          return "md:p-4";
        case "lg":
          return "lg:p-4";
        case "xl":
          return "xl:p-4";
        case "2xl":
          return "2xl:p-4";
        default:
          return "p-4";
      }
    case 5:
      switch (size) {
        case "sm":
          return "sm:p-5";
        case "md":
          return "md:p-5";
        case "lg":
          return "lg:p-5";
        case "xl":
          return "xl:p-5";
        case "2xl":
          return "2xl:p-5";
        default:
          return "p-5";
      }
    case 6:
      switch (size) {
        case "sm":
          return "sm:p-6";
        case "md":
          return "md:p-6";
        case "lg":
          return "lg:p-6";
        case "xl":
          return "xl:p-6";
        case "2xl":
          return "2xl:p-6";
        default:
          return "p-6";
      }
    case 7:
      switch (size) {
        case "sm":
          return "sm:p-7";
        case "md":
          return "md:p-7";
        case "lg":
          return "lg:p-7";
        case "xl":
          return "xl:p-7";
        case "2xl":
          return "2xl:p-7";
        default:
          return "p-7";
      }
    case 8:
      switch (size) {
        case "sm":
          return "sm:p-8";
        case "md":
          return "md:p-8";
        case "lg":
          return "lg:p-8";
        case "xl":
          return "xl:p-8";
        case "2xl":
          return "2xl:p-8";
        default:
          return "p-8";
      }
    case 9:
      switch (size) {
        case "sm":
          return "sm:p-9";
        case "md":
          return "md:p-9";
        case "lg":
          return "lg:p-9";
        case "xl":
          return "xl:p-9";
        case "2xl":
          return "2xl:p-9";
        default:
          return "p-9";
      }
    case 10:
      switch (size) {
        case "sm":
          return "sm:p-10";
        case "md":
          return "md:p-10";
        case "lg":
          return "lg:p-10";
        case "xl":
          return "xl:p-10";
        case "2xl":
          return "2xl:p-10";
        default:
          return "p-10";
      }
    case 11:
      switch (size) {
        case "sm":
          return "sm:p-11";
        case "md":
          return "md:p-11";
        case "lg":
          return "lg:p-11";
        case "xl":
          return "xl:p-11";
        case "2xl":
          return "2xl:p-11";
        default:
          return "p-11";
      }
    case 12:
      switch (size) {
        case "sm":
          return "sm:p-12";
        case "md":
          return "md:p-12";
        case "lg":
          return "lg:p-12";
        case "xl":
          return "xl:p-12";
        case "2xl":
          return "2xl:p-12";
        default:
          return "p-12";
      }
    case 14:
      switch (size) {
        case "sm":
          return "sm:p-14";
        case "md":
          return "md:p-14";
        case "lg":
          return "lg:p-14";
        case "xl":
          return "xl:p-14";
        case "2xl":
          return "2xl:p-14";
        default:
          return "p-14";
      }
    case 16:
      switch (size) {
        case "sm":
          return "sm:p-16";
        case "md":
          return "md:p-16";
        case "lg":
          return "lg:p-16";
        case "xl":
          return "xl:p-16";
        case "2xl":
          return "2xl:p-16";
        default:
          return "p-16";
      }
    case 20:
      switch (size) {
        case "sm":
          return "sm:p-20";
        case "md":
          return "md:p-20";
        case "lg":
          return "lg:p-20";
        case "xl":
          return "xl:p-20";
        case "2xl":
          return "2xl:p-20";
        default:
          return "p-20";
      }
    case 24:
      switch (size) {
        case "sm":
          return "sm:p-24";
        case "md":
          return "md:p-24";
        case "lg":
          return "lg:p-24";
        case "xl":
          return "xl:p-24";
        case "2xl":
          return "2xl:p-24";
        default:
          return "p-24";
      }
    case 28:
      switch (size) {
        case "sm":
          return "sm:p-28";
        case "md":
          return "md:p-28";
        case "lg":
          return "lg:p-28";
        case "xl":
          return "xl:p-28";
        case "2xl":
          return "2xl:p-28";
        default:
          return "p-28";
      }
    case 32:
      switch (size) {
        case "sm":
          return "sm:p-32";
        case "md":
          return "md:p-32";
        case "lg":
          return "lg:p-32";
        case "xl":
          return "xl:p-32";
        case "2xl":
          return "2xl:p-32";
        default:
          return "p-32";
      }
    case 36:
      switch (size) {
        case "sm":
          return "sm:p-36";
        case "md":
          return "md:p-36";
        case "lg":
          return "lg:p-36";
        case "xl":
          return "xl:p-36";
        case "2xl":
          return "2xl:p-36";
        default:
          return "p-36";
      }
    case 40:
      switch (size) {
        case "sm":
          return "sm:p-40";
        case "md":
          return "md:p-40";
        case "lg":
          return "lg:p-40";
        case "xl":
          return "xl:p-40";
        case "2xl":
          return "2xl:p-40";
        default:
          return "p-40";
      }
    case 44:
      switch (size) {
        case "sm":
          return "sm:p-44";
        case "md":
          return "md:p-44";
        case "lg":
          return "lg:p-44";
        case "xl":
          return "xl:p-44";
        case "2xl":
          return "2xl:p-44";
        default:
          return "p-44";
      }
    case 48:
      switch (size) {
        case "sm":
          return "sm:p-48";
        case "md":
          return "md:p-48";
        case "lg":
          return "lg:p-48";
        case "xl":
          return "xl:p-48";
        case "2xl":
          return "2xl:p-48";
        default:
          return "p-48";
      }
    case 52:
      switch (size) {
        case "sm":
          return "sm:p-52";
        case "md":
          return "md:p-52";
        case "lg":
          return "lg:p-52";
        case "xl":
          return "xl:p-52";
        case "2xl":
          return "2xl:p-52";
        default:
          return "p-52";
      }
    case 56:
      switch (size) {
        case "sm":
          return "sm:p-56";
        case "md":
          return "md:p-56";
        case "lg":
          return "lg:p-56";
        case "xl":
          return "xl:p-56";
        case "2xl":
          return "2xl:p-56";
        default:
          return "p-56";
      }
    case 60:
      switch (size) {
        case "sm":
          return "sm:p-60";
        case "md":
          return "md:p-60";
        case "lg":
          return "lg:p-60";
        case "xl":
          return "xl:p-60";
        case "2xl":
          return "2xl:p-60";
        default:
          return "p-60";
      }
    case 64:
      switch (size) {
        case "sm":
          return "sm:p-64";
        case "md":
          return "md:p-64";
        case "lg":
          return "lg:p-64";
        case "xl":
          return "xl:p-64";
        case "2xl":
          return "2xl:p-64";
        default:
          return "p-64";
      }
    case 72:
      switch (size) {
        case "sm":
          return "sm:p-72";
        case "md":
          return "md:p-72";
        case "lg":
          return "lg:p-72";
        case "xl":
          return "xl:p-72";
        case "2xl":
          return "2xl:p-72";
        default:
          return "p-72";
      }
    case 80:
      switch (size) {
        case "sm":
          return "sm:p-80";
        case "md":
          return "md:p-80";
        case "lg":
          return "lg:p-80";
        case "xl":
          return "xl:p-80";
        case "2xl":
          return "2xl:p-80";
        default:
          return "p-80";
      }
    case 96:
      switch (size) {
        case "sm":
          return "sm:p-96";
        case "md":
          return "md:p-96";
        case "lg":
          return "lg:p-96";
        case "xl":
          return "xl:p-96";
        case "2xl":
          return "2xl:p-96";
        default:
          return "p-96";
      }
  }
};
