import { ColorName } from "~/components/layout/Pane";

export type TextAlignment = "center" | "left" | "right" | "justify";
export type TextDecoration = "underline" | "line-through" | "no-underline";
export type TextTransform =
  | "uppercase"
  | "lowercase"
  | "capitalize"
  | "normal-case";
export type TextOverflow = "truncate" | "text-clip" | "text-ellipsis";
export type TextOpacity =
  | 0
  | 5
  | 10
  | 20
  | 25
  | 30
  | 40
  | 50
  | 60
  | 70
  | 75
  | 80
  | 90
  | 95;

export type TextWeight =
  | "thin"
  | "extralight"
  | "light"
  | "normal"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold"
  | "black";

export type TextSize =
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl"
  | "8xl"
  | "9xl";

export type TextColor = `text-${ColorName}`;

export type XsTextProps = {
  align: TextAlignment;
  color: TextColor;
  hover: boolean;
  decoration: TextDecoration;
  opacity: TextOpacity;
  overflow: TextOverflow;
  size: TextSize;
  transform: TextTransform;
  weight: TextWeight;
};

export type SmTextProps = {
  smAlign: TextAlignment;
  smOpacity: TextOpacity;
  smSize: TextSize;
  smWeight: TextWeight;
};

export type MdTextProps = {
  mdAlign: TextAlignment;
  mdOpacity: TextOpacity;
  mdSize: TextSize;
  mdWeight: TextWeight;
};

export type XlTextProps = {
  xlAlign: TextAlignment;

  xlOpacity: TextOpacity;
  xlSize: TextSize;

  xlWeight: TextWeight;
};
