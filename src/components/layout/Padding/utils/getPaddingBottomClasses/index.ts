import { Spacing } from "~/common/spacing";
import { ScreenSize } from "~/types";
import { isNullOrUndefined } from "~/utils/isNullOrUndefined";

type Param = {
  space?: Spacing;
  size?: ScreenSize;
};

export const getPaddingBottomClasses = ({ space, size }: Param) => {
  if (isNullOrUndefined(space)) {
    return null;
  }

  switch (space) {
    case 0:
      switch (size) {
        case "sm":
          return "sm:pb-0";
        case "md":
          return "md:pb-0";
        case "lg":
          return "lg:pb-0";
        case "xl":
          return "xl:pb-0";
        case "2xl":
          return "2xl:pb-0";
        default:
          return "pb-0";
      }
    case 0.5:
      switch (size) {
        case "sm":
          return "sm:pb-0.5";
        case "md":
          return "md:pb-0.5";
        case "lg":
          return "lg:pb-0.5";
        case "xl":
          return "xl:pb-0.5";
        case "2xl":
          return "2xl:pb-0.5";
        default:
          return "pb-0.5";
      }
    case 1:
      switch (size) {
        case "sm":
          return "sm:pb-1";
        case "md":
          return "md:pb-1";
        case "lg":
          return "lg:pb-1";
        case "xl":
          return "xl:pb-1";
        case "2xl":
          return "2xl:pb-1";
        default:
          return "pb-1";
      }
    case 1.5:
      switch (size) {
        case "sm":
          return "sm:pb-1.5";
        case "md":
          return "md:pb-1.5";
        case "lg":
          return "lg:pb-1.5";
        case "xl":
          return "xl:pb-1.5";
        case "2xl":
          return "2xl:pb-1.5";
        default:
          return "pb-1.5";
      }
    case 2:
      switch (size) {
        case "sm":
          return "sm:pb-2";
        case "md":
          return "md:pb-2";
        case "lg":
          return "lg:pb-2";
        case "xl":
          return "xl:pb-2";
        case "2xl":
          return "2xl:pb-2";
        default:
          return "pb-2";
      }
    case 2.5:
      switch (size) {
        case "sm":
          return "sm:pb-2.5";
        case "md":
          return "md:pb-2.5";
        case "lg":
          return "lg:pb-2.5";
        case "xl":
          return "xl:pb-2.5";
        case "2xl":
          return "2xl:pb-2.5";
        default:
          return "pb-2.5";
      }
    case 3:
      switch (size) {
        case "sm":
          return "sm:pb-3";
        case "md":
          return "md:pb-3";
        case "lg":
          return "lg:pb-3";
        case "xl":
          return "xl:pb-3";
        case "2xl":
          return "2xl:pb-3";
        default:
          return "pb-3";
      }
    case 3.5:
      switch (size) {
        case "sm":
          return "sm:pb-3.5";
        case "md":
          return "md:pb-3.5";
        case "lg":
          return "lg:pb-3.5";
        case "xl":
          return "xl:pb-3.5";
        case "2xl":
          return "2xl:pb-3.5";
        default:
          return "pb-3.5";
      }
    case 4:
      switch (size) {
        case "sm":
          return "sm:pb-4";
        case "md":
          return "md:pb-4";
        case "lg":
          return "lg:pb-4";
        case "xl":
          return "xl:pb-4";
        case "2xl":
          return "2xl:pb-4";
        default:
          return "pb-4";
      }
    case 5:
      switch (size) {
        case "sm":
          return "sm:pb-5";
        case "md":
          return "md:pb-5";
        case "lg":
          return "lg:pb-5";
        case "xl":
          return "xl:pb-5";
        case "2xl":
          return "2xl:pb-5";
        default:
          return "pb-5";
      }
    case 6:
      switch (size) {
        case "sm":
          return "sm:pb-6";
        case "md":
          return "md:pb-6";
        case "lg":
          return "lg:pb-6";
        case "xl":
          return "xl:pb-6";
        case "2xl":
          return "2xl:pb-6";
        default:
          return "pb-6";
      }
    case 7:
      switch (size) {
        case "sm":
          return "sm:pb-7";
        case "md":
          return "md:pb-7";
        case "lg":
          return "lg:pb-7";
        case "xl":
          return "xl:pb-7";
        case "2xl":
          return "2xl:pb-7";
        default:
          return "pb-7";
      }
    case 8:
      switch (size) {
        case "sm":
          return "sm:pb-8";
        case "md":
          return "md:pb-8";
        case "lg":
          return "lg:pb-8";
        case "xl":
          return "xl:pb-8";
        case "2xl":
          return "2xl:pb-8";
        default:
          return "pb-8";
      }
    case 9:
      switch (size) {
        case "sm":
          return "sm:pb-9";
        case "md":
          return "md:pb-9";
        case "lg":
          return "lg:pb-9";
        case "xl":
          return "xl:pb-9";
        case "2xl":
          return "2xl:pb-9";
        default:
          return "pb-9";
      }
    case 10:
      switch (size) {
        case "sm":
          return "sm:pb-10";
        case "md":
          return "md:pb-10";
        case "lg":
          return "lg:pb-10";
        case "xl":
          return "xl:pb-10";
        case "2xl":
          return "2xl:pb-10";
        default:
          return "pb-10";
      }
    case 11:
      switch (size) {
        case "sm":
          return "sm:pb-11";
        case "md":
          return "md:pb-11";
        case "lg":
          return "lg:pb-11";
        case "xl":
          return "xl:pb-11";
        case "2xl":
          return "2xl:pb-11";
        default:
          return "pb-11";
      }
    case 12:
      switch (size) {
        case "sm":
          return "sm:pb-12";
        case "md":
          return "md:pb-12";
        case "lg":
          return "lg:pb-12";
        case "xl":
          return "xl:pb-12";
        case "2xl":
          return "2xl:pb-12";
        default:
          return "pb-12";
      }
    case 14:
      switch (size) {
        case "sm":
          return "sm:pb-14";
        case "md":
          return "md:pb-14";
        case "lg":
          return "lg:pb-14";
        case "xl":
          return "xl:pb-14";
        case "2xl":
          return "2xl:pb-14";
        default:
          return "pb-14";
      }
    case 16:
      switch (size) {
        case "sm":
          return "sm:pb-16";
        case "md":
          return "md:pb-16";
        case "lg":
          return "lg:pb-16";
        case "xl":
          return "xl:pb-16";
        case "2xl":
          return "2xl:pb-16";
        default:
          return "pb-16";
      }
    case 20:
      switch (size) {
        case "sm":
          return "sm:pb-20";
        case "md":
          return "md:pb-20";
        case "lg":
          return "lg:pb-20";
        case "xl":
          return "xl:pb-20";
        case "2xl":
          return "2xl:pb-20";
        default:
          return "pb-20";
      }
    case 24:
      switch (size) {
        case "sm":
          return "sm:pb-24";
        case "md":
          return "md:pb-24";
        case "lg":
          return "lg:pb-24";
        case "xl":
          return "xl:pb-24";
        case "2xl":
          return "2xl:pb-24";
        default:
          return "pb-24";
      }
    case 28:
      switch (size) {
        case "sm":
          return "sm:pb-28";
        case "md":
          return "md:pb-28";
        case "lg":
          return "lg:pb-28";
        case "xl":
          return "xl:pb-28";
        case "2xl":
          return "2xl:pb-28";
        default:
          return "pb-28";
      }
    case 32:
      switch (size) {
        case "sm":
          return "sm:pb-32";
        case "md":
          return "md:pb-32";
        case "lg":
          return "lg:pb-32";
        case "xl":
          return "xl:pb-32";
        case "2xl":
          return "2xl:pb-32";
        default:
          return "pb-32";
      }
    case 36:
      switch (size) {
        case "sm":
          return "sm:pb-36";
        case "md":
          return "md:pb-36";
        case "lg":
          return "lg:pb-36";
        case "xl":
          return "xl:pb-36";
        case "2xl":
          return "2xl:pb-36";
        default:
          return "pb-36";
      }
    case 40:
      switch (size) {
        case "sm":
          return "sm:pb-40";
        case "md":
          return "md:pb-40";
        case "lg":
          return "lg:pb-40";
        case "xl":
          return "xl:pb-40";
        case "2xl":
          return "2xl:pb-40";
        default:
          return "pb-40";
      }
    case 44:
      switch (size) {
        case "sm":
          return "sm:pb-44";
        case "md":
          return "md:pb-44";
        case "lg":
          return "lg:pb-44";
        case "xl":
          return "xl:pb-44";
        case "2xl":
          return "2xl:pb-44";
        default:
          return "pb-44";
      }
    case 48:
      switch (size) {
        case "sm":
          return "sm:pb-48";
        case "md":
          return "md:pb-48";
        case "lg":
          return "lg:pb-48";
        case "xl":
          return "xl:pb-48";
        case "2xl":
          return "2xl:pb-48";
        default:
          return "pb-48";
      }
    case 52:
      switch (size) {
        case "sm":
          return "sm:pb-52";
        case "md":
          return "md:pb-52";
        case "lg":
          return "lg:pb-52";
        case "xl":
          return "xl:pb-52";
        case "2xl":
          return "2xl:pb-52";
        default:
          return "pb-52";
      }
    case 56:
      switch (size) {
        case "sm":
          return "sm:pb-56";
        case "md":
          return "md:pb-56";
        case "lg":
          return "lg:pb-56";
        case "xl":
          return "xl:pb-56";
        case "2xl":
          return "2xl:pb-56";
        default:
          return "pb-56";
      }
    case 60:
      switch (size) {
        case "sm":
          return "sm:pb-60";
        case "md":
          return "md:pb-60";
        case "lg":
          return "lg:pb-60";
        case "xl":
          return "xl:pb-60";
        case "2xl":
          return "2xl:pb-60";
        default:
          return "pb-60";
      }
    case 64:
      switch (size) {
        case "sm":
          return "sm:pb-64";
        case "md":
          return "md:pb-64";
        case "lg":
          return "lg:pb-64";
        case "xl":
          return "xl:pb-64";
        case "2xl":
          return "2xl:pb-64";
        default:
          return "pb-64";
      }
    case 72:
      switch (size) {
        case "sm":
          return "sm:pb-72";
        case "md":
          return "md:pb-72";
        case "lg":
          return "lg:pb-72";
        case "xl":
          return "xl:pb-72";
        case "2xl":
          return "2xl:pb-72";
        default:
          return "pb-72";
      }
    case 80:
      switch (size) {
        case "sm":
          return "sm:pb-80";
        case "md":
          return "md:pb-80";
        case "lg":
          return "lg:pb-80";
        case "xl":
          return "xl:pb-80";
        case "2xl":
          return "2xl:pb-80";
        default:
          return "pb-80";
      }
    case 96:
      switch (size) {
        case "sm":
          return "sm:pb-96";
        case "md":
          return "md:pb-96";
        case "lg":
          return "lg:pb-96";
        case "xl":
          return "xl:pb-96";
        case "2xl":
          return "2xl:pb-96";
        default:
          return "pb-96";
      }
  }
};
