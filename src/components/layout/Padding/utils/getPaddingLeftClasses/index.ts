import { Spacing } from "~/common/spacing";
import { ScreenSize } from "~/types";
import { isNullOrUndefined } from "~/utils/isNullOrUndefined";

type Param = {
  space?: Spacing;
  size?: ScreenSize;
};

export const getPaddingLeftClasses = ({ space, size }: Param) => {
  if (isNullOrUndefined(space)) {
    return null;
  }

  switch (space) {
    case 0:
      switch (size) {
        case "sm":
          return "sm:pl-0";
        case "md":
          return "md:pl-0";
        case "lg":
          return "lg:pl-0";
        case "xl":
          return "xl:pl-0";
        case "2xl":
          return "2xl:pl-0";
        default:
          return "pl-0";
      }
    case 0.5:
      switch (size) {
        case "sm":
          return "sm:pl-0.5";
        case "md":
          return "md:pl-0.5";
        case "lg":
          return "lg:pl-0.5";
        case "xl":
          return "xl:pl-0.5";
        case "2xl":
          return "2xl:pl-0.5";
        default:
          return "pl-0.5";
      }
    case 1:
      switch (size) {
        case "sm":
          return "sm:pl-1";
        case "md":
          return "md:pl-1";
        case "lg":
          return "lg:pl-1";
        case "xl":
          return "xl:pl-1";
        case "2xl":
          return "2xl:pl-1";
        default:
          return "pl-1";
      }
    case 1.5:
      switch (size) {
        case "sm":
          return "sm:pl-1.5";
        case "md":
          return "md:pl-1.5";
        case "lg":
          return "lg:pl-1.5";
        case "xl":
          return "xl:pl-1.5";
        case "2xl":
          return "2xl:pl-1.5";
        default:
          return "pl-1.5";
      }
    case 2:
      switch (size) {
        case "sm":
          return "sm:pl-2";
        case "md":
          return "md:pl-2";
        case "lg":
          return "lg:pl-2";
        case "xl":
          return "xl:pl-2";
        case "2xl":
          return "2xl:pl-2";
        default:
          return "pl-2";
      }
    case 2.5:
      switch (size) {
        case "sm":
          return "sm:pl-2.5";
        case "md":
          return "md:pl-2.5";
        case "lg":
          return "lg:pl-2.5";
        case "xl":
          return "xl:pl-2.5";
        case "2xl":
          return "2xl:pl-2.5";
        default:
          return "pl-2.5";
      }
    case 3:
      switch (size) {
        case "sm":
          return "sm:pl-3";
        case "md":
          return "md:pl-3";
        case "lg":
          return "lg:pl-3";
        case "xl":
          return "xl:pl-3";
        case "2xl":
          return "2xl:pl-3";
        default:
          return "pl-3";
      }
    case 3.5:
      switch (size) {
        case "sm":
          return "sm:pl-3.5";
        case "md":
          return "md:pl-3.5";
        case "lg":
          return "lg:pl-3.5";
        case "xl":
          return "xl:pl-3.5";
        case "2xl":
          return "2xl:pl-3.5";
        default:
          return "pl-3.5";
      }
    case 4:
      switch (size) {
        case "sm":
          return "sm:pl-4";
        case "md":
          return "md:pl-4";
        case "lg":
          return "lg:pl-4";
        case "xl":
          return "xl:pl-4";
        case "2xl":
          return "2xl:pl-4";
        default:
          return "pl-4";
      }
    case 5:
      switch (size) {
        case "sm":
          return "sm:pl-5";
        case "md":
          return "md:pl-5";
        case "lg":
          return "lg:pl-5";
        case "xl":
          return "xl:pl-5";
        case "2xl":
          return "2xl:pl-5";
        default:
          return "pl-5";
      }
    case 6:
      switch (size) {
        case "sm":
          return "sm:pl-6";
        case "md":
          return "md:pl-6";
        case "lg":
          return "lg:pl-6";
        case "xl":
          return "xl:pl-6";
        case "2xl":
          return "2xl:pl-6";
        default:
          return "pl-6";
      }
    case 7:
      switch (size) {
        case "sm":
          return "sm:pl-7";
        case "md":
          return "md:pl-7";
        case "lg":
          return "lg:pl-7";
        case "xl":
          return "xl:pl-7";
        case "2xl":
          return "2xl:pl-7";
        default:
          return "pl-7";
      }
    case 8:
      switch (size) {
        case "sm":
          return "sm:pl-8";
        case "md":
          return "md:pl-8";
        case "lg":
          return "lg:pl-8";
        case "xl":
          return "xl:pl-8";
        case "2xl":
          return "2xl:pl-8";
        default:
          return "pl-8";
      }
    case 9:
      switch (size) {
        case "sm":
          return "sm:pl-9";
        case "md":
          return "md:pl-9";
        case "lg":
          return "lg:pl-9";
        case "xl":
          return "xl:pl-9";
        case "2xl":
          return "2xl:pl-9";
        default:
          return "pl-9";
      }
    case 10:
      switch (size) {
        case "sm":
          return "sm:pl-10";
        case "md":
          return "md:pl-10";
        case "lg":
          return "lg:pl-10";
        case "xl":
          return "xl:pl-10";
        case "2xl":
          return "2xl:pl-10";
        default:
          return "pl-10";
      }
    case 11:
      switch (size) {
        case "sm":
          return "sm:pl-11";
        case "md":
          return "md:pl-11";
        case "lg":
          return "lg:pl-11";
        case "xl":
          return "xl:pl-11";
        case "2xl":
          return "2xl:pl-11";
        default:
          return "pl-11";
      }
    case 12:
      switch (size) {
        case "sm":
          return "sm:pl-12";
        case "md":
          return "md:pl-12";
        case "lg":
          return "lg:pl-12";
        case "xl":
          return "xl:pl-12";
        case "2xl":
          return "2xl:pl-12";
        default:
          return "pl-12";
      }
    case 14:
      switch (size) {
        case "sm":
          return "sm:pl-14";
        case "md":
          return "md:pl-14";
        case "lg":
          return "lg:pl-14";
        case "xl":
          return "xl:pl-14";
        case "2xl":
          return "2xl:pl-14";
        default:
          return "pl-14";
      }
    case 16:
      switch (size) {
        case "sm":
          return "sm:pl-16";
        case "md":
          return "md:pl-16";
        case "lg":
          return "lg:pl-16";
        case "xl":
          return "xl:pl-16";
        case "2xl":
          return "2xl:pl-16";
        default:
          return "pl-16";
      }
    case 20:
      switch (size) {
        case "sm":
          return "sm:pl-20";
        case "md":
          return "md:pl-20";
        case "lg":
          return "lg:pl-20";
        case "xl":
          return "xl:pl-20";
        case "2xl":
          return "2xl:pl-20";
        default:
          return "pl-20";
      }
    case 24:
      switch (size) {
        case "sm":
          return "sm:pl-24";
        case "md":
          return "md:pl-24";
        case "lg":
          return "lg:pl-24";
        case "xl":
          return "xl:pl-24";
        case "2xl":
          return "2xl:pl-24";
        default:
          return "pl-24";
      }
    case 28:
      switch (size) {
        case "sm":
          return "sm:pl-28";
        case "md":
          return "md:pl-28";
        case "lg":
          return "lg:pl-28";
        case "xl":
          return "xl:pl-28";
        case "2xl":
          return "2xl:pl-28";
        default:
          return "pl-28";
      }
    case 32:
      switch (size) {
        case "sm":
          return "sm:pl-32";
        case "md":
          return "md:pl-32";
        case "lg":
          return "lg:pl-32";
        case "xl":
          return "xl:pl-32";
        case "2xl":
          return "2xl:pl-32";
        default:
          return "pl-32";
      }
    case 36:
      switch (size) {
        case "sm":
          return "sm:pl-36";
        case "md":
          return "md:pl-36";
        case "lg":
          return "lg:pl-36";
        case "xl":
          return "xl:pl-36";
        case "2xl":
          return "2xl:pl-36";
        default:
          return "pl-36";
      }
    case 40:
      switch (size) {
        case "sm":
          return "sm:pl-40";
        case "md":
          return "md:pl-40";
        case "lg":
          return "lg:pl-40";
        case "xl":
          return "xl:pl-40";
        case "2xl":
          return "2xl:pl-40";
        default:
          return "pl-40";
      }
    case 44:
      switch (size) {
        case "sm":
          return "sm:pl-44";
        case "md":
          return "md:pl-44";
        case "lg":
          return "lg:pl-44";
        case "xl":
          return "xl:pl-44";
        case "2xl":
          return "2xl:pl-44";
        default:
          return "pl-44";
      }
    case 48:
      switch (size) {
        case "sm":
          return "sm:pl-48";
        case "md":
          return "md:pl-48";
        case "lg":
          return "lg:pl-48";
        case "xl":
          return "xl:pl-48";
        case "2xl":
          return "2xl:pl-48";
        default:
          return "pl-48";
      }
    case 52:
      switch (size) {
        case "sm":
          return "sm:pl-52";
        case "md":
          return "md:pl-52";
        case "lg":
          return "lg:pl-52";
        case "xl":
          return "xl:pl-52";
        case "2xl":
          return "2xl:pl-52";
        default:
          return "pl-52";
      }
    case 56:
      switch (size) {
        case "sm":
          return "sm:pl-56";
        case "md":
          return "md:pl-56";
        case "lg":
          return "lg:pl-56";
        case "xl":
          return "xl:pl-56";
        case "2xl":
          return "2xl:pl-56";
        default:
          return "pl-56";
      }
    case 60:
      switch (size) {
        case "sm":
          return "sm:pl-60";
        case "md":
          return "md:pl-60";
        case "lg":
          return "lg:pl-60";
        case "xl":
          return "xl:pl-60";
        case "2xl":
          return "2xl:pl-60";
        default:
          return "pl-60";
      }
    case 64:
      switch (size) {
        case "sm":
          return "sm:pl-64";
        case "md":
          return "md:pl-64";
        case "lg":
          return "lg:pl-64";
        case "xl":
          return "xl:pl-64";
        case "2xl":
          return "2xl:pl-64";
        default:
          return "pl-64";
      }
    case 72:
      switch (size) {
        case "sm":
          return "sm:pl-72";
        case "md":
          return "md:pl-72";
        case "lg":
          return "lg:pl-72";
        case "xl":
          return "xl:pl-72";
        case "2xl":
          return "2xl:pl-72";
        default:
          return "pl-72";
      }
    case 80:
      switch (size) {
        case "sm":
          return "sm:pl-80";
        case "md":
          return "md:pl-80";
        case "lg":
          return "lg:pl-80";
        case "xl":
          return "xl:pl-80";
        case "2xl":
          return "2xl:pl-80";
        default:
          return "pl-80";
      }
    case 96:
      switch (size) {
        case "sm":
          return "sm:pl-96";
        case "md":
          return "md:pl-96";
        case "lg":
          return "lg:pl-96";
        case "xl":
          return "xl:pl-96";
        case "2xl":
          return "2xl:pl-96";
        default:
          return "pl-96";
      }
  }
};
