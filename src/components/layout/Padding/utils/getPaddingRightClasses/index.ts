import { Spacing } from "~/common/spacing";
import { ScreenSize } from "~/types";
import { isNullOrUndefined } from "~/utils/isNullOrUndefined";

type Param = {
  space?: Spacing;
  size?: ScreenSize;
};

export const getPaddingRightClasses = ({ space, size }: Param) => {
  if (isNullOrUndefined(space)) {
    return null;
  }

  switch (space) {
    case 0:
      switch (size) {
        case "sm":
          return "sm:pr-0";
        case "md":
          return "md:pr-0";
        case "lg":
          return "lg:pr-0";
        case "xl":
          return "xl:pr-0";
        case "2xl":
          return "2xl:pr-0";
        default:
          return "pr-0";
      }
    case 0.5:
      switch (size) {
        case "sm":
          return "sm:pr-0.5";
        case "md":
          return "md:pr-0.5";
        case "lg":
          return "lg:pr-0.5";
        case "xl":
          return "xl:pr-0.5";
        case "2xl":
          return "2xl:pr-0.5";
        default:
          return "pr-0.5";
      }
    case 1:
      switch (size) {
        case "sm":
          return "sm:pr-1";
        case "md":
          return "md:pr-1";
        case "lg":
          return "lg:pr-1";
        case "xl":
          return "xl:pr-1";
        case "2xl":
          return "2xl:pr-1";
        default:
          return "pr-1";
      }
    case 1.5:
      switch (size) {
        case "sm":
          return "sm:pr-1.5";
        case "md":
          return "md:pr-1.5";
        case "lg":
          return "lg:pr-1.5";
        case "xl":
          return "xl:pr-1.5";
        case "2xl":
          return "2xl:pr-1.5";
        default:
          return "pr-1.5";
      }
    case 2:
      switch (size) {
        case "sm":
          return "sm:pr-2";
        case "md":
          return "md:pr-2";
        case "lg":
          return "lg:pr-2";
        case "xl":
          return "xl:pr-2";
        case "2xl":
          return "2xl:pr-2";
        default:
          return "pr-2";
      }
    case 2.5:
      switch (size) {
        case "sm":
          return "sm:pr-2.5";
        case "md":
          return "md:pr-2.5";
        case "lg":
          return "lg:pr-2.5";
        case "xl":
          return "xl:pr-2.5";
        case "2xl":
          return "2xl:pr-2.5";
        default:
          return "pr-2.5";
      }
    case 3:
      switch (size) {
        case "sm":
          return "sm:pr-3";
        case "md":
          return "md:pr-3";
        case "lg":
          return "lg:pr-3";
        case "xl":
          return "xl:pr-3";
        case "2xl":
          return "2xl:pr-3";
        default:
          return "pr-3";
      }
    case 3.5:
      switch (size) {
        case "sm":
          return "sm:pr-3.5";
        case "md":
          return "md:pr-3.5";
        case "lg":
          return "lg:pr-3.5";
        case "xl":
          return "xl:pr-3.5";
        case "2xl":
          return "2xl:pr-3.5";
        default:
          return "pr-3.5";
      }
    case 4:
      switch (size) {
        case "sm":
          return "sm:pr-4";
        case "md":
          return "md:pr-4";
        case "lg":
          return "lg:pr-4";
        case "xl":
          return "xl:pr-4";
        case "2xl":
          return "2xl:pr-4";
        default:
          return "pr-4";
      }
    case 5:
      switch (size) {
        case "sm":
          return "sm:pr-5";
        case "md":
          return "md:pr-5";
        case "lg":
          return "lg:pr-5";
        case "xl":
          return "xl:pr-5";
        case "2xl":
          return "2xl:pr-5";
        default:
          return "pr-5";
      }
    case 6:
      switch (size) {
        case "sm":
          return "sm:pr-6";
        case "md":
          return "md:pr-6";
        case "lg":
          return "lg:pr-6";
        case "xl":
          return "xl:pr-6";
        case "2xl":
          return "2xl:pr-6";
        default:
          return "pr-6";
      }
    case 7:
      switch (size) {
        case "sm":
          return "sm:pr-7";
        case "md":
          return "md:pr-7";
        case "lg":
          return "lg:pr-7";
        case "xl":
          return "xl:pr-7";
        case "2xl":
          return "2xl:pr-7";
        default:
          return "pr-7";
      }
    case 8:
      switch (size) {
        case "sm":
          return "sm:pr-8";
        case "md":
          return "md:pr-8";
        case "lg":
          return "lg:pr-8";
        case "xl":
          return "xl:pr-8";
        case "2xl":
          return "2xl:pr-8";
        default:
          return "pr-8";
      }
    case 9:
      switch (size) {
        case "sm":
          return "sm:pr-9";
        case "md":
          return "md:pr-9";
        case "lg":
          return "lg:pr-9";
        case "xl":
          return "xl:pr-9";
        case "2xl":
          return "2xl:pr-9";
        default:
          return "pr-9";
      }
    case 10:
      switch (size) {
        case "sm":
          return "sm:pr-10";
        case "md":
          return "md:pr-10";
        case "lg":
          return "lg:pr-10";
        case "xl":
          return "xl:pr-10";
        case "2xl":
          return "2xl:pr-10";
        default:
          return "pr-10";
      }
    case 11:
      switch (size) {
        case "sm":
          return "sm:pr-11";
        case "md":
          return "md:pr-11";
        case "lg":
          return "lg:pr-11";
        case "xl":
          return "xl:pr-11";
        case "2xl":
          return "2xl:pr-11";
        default:
          return "pr-11";
      }
    case 12:
      switch (size) {
        case "sm":
          return "sm:pr-12";
        case "md":
          return "md:pr-12";
        case "lg":
          return "lg:pr-12";
        case "xl":
          return "xl:pr-12";
        case "2xl":
          return "2xl:pr-12";
        default:
          return "pr-12";
      }
    case 14:
      switch (size) {
        case "sm":
          return "sm:pr-14";
        case "md":
          return "md:pr-14";
        case "lg":
          return "lg:pr-14";
        case "xl":
          return "xl:pr-14";
        case "2xl":
          return "2xl:pr-14";
        default:
          return "pr-14";
      }
    case 16:
      switch (size) {
        case "sm":
          return "sm:pr-16";
        case "md":
          return "md:pr-16";
        case "lg":
          return "lg:pr-16";
        case "xl":
          return "xl:pr-16";
        case "2xl":
          return "2xl:pr-16";
        default:
          return "pr-16";
      }
    case 20:
      switch (size) {
        case "sm":
          return "sm:pr-20";
        case "md":
          return "md:pr-20";
        case "lg":
          return "lg:pr-20";
        case "xl":
          return "xl:pr-20";
        case "2xl":
          return "2xl:pr-20";
        default:
          return "pr-20";
      }
    case 24:
      switch (size) {
        case "sm":
          return "sm:pr-24";
        case "md":
          return "md:pr-24";
        case "lg":
          return "lg:pr-24";
        case "xl":
          return "xl:pr-24";
        case "2xl":
          return "2xl:pr-24";
        default:
          return "pr-24";
      }
    case 28:
      switch (size) {
        case "sm":
          return "sm:pr-28";
        case "md":
          return "md:pr-28";
        case "lg":
          return "lg:pr-28";
        case "xl":
          return "xl:pr-28";
        case "2xl":
          return "2xl:pr-28";
        default:
          return "pr-28";
      }
    case 32:
      switch (size) {
        case "sm":
          return "sm:pr-32";
        case "md":
          return "md:pr-32";
        case "lg":
          return "lg:pr-32";
        case "xl":
          return "xl:pr-32";
        case "2xl":
          return "2xl:pr-32";
        default:
          return "pr-32";
      }
    case 36:
      switch (size) {
        case "sm":
          return "sm:pr-36";
        case "md":
          return "md:pr-36";
        case "lg":
          return "lg:pr-36";
        case "xl":
          return "xl:pr-36";
        case "2xl":
          return "2xl:pr-36";
        default:
          return "pr-36";
      }
    case 40:
      switch (size) {
        case "sm":
          return "sm:pr-40";
        case "md":
          return "md:pr-40";
        case "lg":
          return "lg:pr-40";
        case "xl":
          return "xl:pr-40";
        case "2xl":
          return "2xl:pr-40";
        default:
          return "pr-40";
      }
    case 44:
      switch (size) {
        case "sm":
          return "sm:pr-44";
        case "md":
          return "md:pr-44";
        case "lg":
          return "lg:pr-44";
        case "xl":
          return "xl:pr-44";
        case "2xl":
          return "2xl:pr-44";
        default:
          return "pr-44";
      }
    case 48:
      switch (size) {
        case "sm":
          return "sm:pr-48";
        case "md":
          return "md:pr-48";
        case "lg":
          return "lg:pr-48";
        case "xl":
          return "xl:pr-48";
        case "2xl":
          return "2xl:pr-48";
        default:
          return "pr-48";
      }
    case 52:
      switch (size) {
        case "sm":
          return "sm:pr-52";
        case "md":
          return "md:pr-52";
        case "lg":
          return "lg:pr-52";
        case "xl":
          return "xl:pr-52";
        case "2xl":
          return "2xl:pr-52";
        default:
          return "pr-52";
      }
    case 56:
      switch (size) {
        case "sm":
          return "sm:pr-56";
        case "md":
          return "md:pr-56";
        case "lg":
          return "lg:pr-56";
        case "xl":
          return "xl:pr-56";
        case "2xl":
          return "2xl:pr-56";
        default:
          return "pr-56";
      }
    case 60:
      switch (size) {
        case "sm":
          return "sm:pr-60";
        case "md":
          return "md:pr-60";
        case "lg":
          return "lg:pr-60";
        case "xl":
          return "xl:pr-60";
        case "2xl":
          return "2xl:pr-60";
        default:
          return "pr-60";
      }
    case 64:
      switch (size) {
        case "sm":
          return "sm:pr-64";
        case "md":
          return "md:pr-64";
        case "lg":
          return "lg:pr-64";
        case "xl":
          return "xl:pr-64";
        case "2xl":
          return "2xl:pr-64";
        default:
          return "pr-64";
      }
    case 72:
      switch (size) {
        case "sm":
          return "sm:pr-72";
        case "md":
          return "md:pr-72";
        case "lg":
          return "lg:pr-72";
        case "xl":
          return "xl:pr-72";
        case "2xl":
          return "2xl:pr-72";
        default:
          return "pr-72";
      }
    case 80:
      switch (size) {
        case "sm":
          return "sm:pr-80";
        case "md":
          return "md:pr-80";
        case "lg":
          return "lg:pr-80";
        case "xl":
          return "xl:pr-80";
        case "2xl":
          return "2xl:pr-80";
        default:
          return "pr-80";
      }
    case 96:
      switch (size) {
        case "sm":
          return "sm:pr-96";
        case "md":
          return "md:pr-96";
        case "lg":
          return "lg:pr-96";
        case "xl":
          return "xl:pr-96";
        case "2xl":
          return "2xl:pr-96";
        default:
          return "pr-96";
      }
  }
};
