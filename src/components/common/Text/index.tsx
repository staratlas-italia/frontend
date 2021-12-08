import classNames from "classnames";
import { PropsWithChildren } from "react";
import styled from "styled-components";
import { ColorName } from "~/components/layout/Pane";

type TextAlignment = "center" | "left" | "right" | "justify";
type TextDecoration = "underline" | "line-through" | "no-underline";
type TextTransform = "uppercase" | "lowercase" | "capitalize" | "normal-case";
type TextOverflow = "truncate" | "overflow-clip" | "overflow-ellipsis";
type TextOpacity =
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

type TextWeight =
  | "thin"
  | "extralight"
  | "light"
  | "normal"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold"
  | "black";

type TextSize =
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

type TextProps = {
  align: TextAlignment;
  color: ColorName;
  hoverColor: ColorName;
  decoration: TextDecoration;
  opacity: TextOpacity;
  overflow: TextOverflow;
  size: TextSize;
  transform: TextTransform;
  weight: TextWeight;
};

type SmTextProps = {
  smAlign: TextAlignment;
  smColor: ColorName;
  smDecoration: TextDecoration;
  smOpacity: TextOpacity;
  smOverflow: TextOverflow;
  smSize: TextSize;
  smTransform: TextTransform;
  smWeight: TextWeight;
};

type MdTextProps = {
  mdAlign: TextAlignment;
  mdColor: ColorName;
  mdDecoration: TextDecoration;
  mdOpacity: TextOpacity;
  mdOverflow: TextOverflow;
  mdSize: TextSize;
  mdTransform: TextTransform;
  mdWeight: TextWeight;
};

type XlTextProps = {
  xlAlign: TextAlignment;
  xlColor: ColorName;
  xlDecoration: TextDecoration;
  xlOpacity: TextOpacity;
  xlOverflow: TextOverflow;
  xlSize: TextSize;
  xlTransform: TextTransform;
  xlWeight: TextWeight;
};

type Props = PropsWithChildren<
  Partial<TextProps & SmTextProps & MdTextProps & XlTextProps>
>;

export const Text = styled.span.attrs(
  ({
    align,
    color,
    hoverColor,
    decoration,
    opacity,
    overflow,
    size,
    transform,
    weight,
    smAlign,
    smColor,
    smDecoration,
    smOpacity,
    smOverflow,
    smSize,
    smTransform,
    smWeight,
    mdAlign,
    mdColor,
    mdDecoration,
    mdOpacity,
    mdOverflow,
    mdSize,
    mdTransform,
    mdWeight,
    xlAlign,
    xlColor,
    xlDecoration,
    xlOpacity,
    xlOverflow,
    xlSize,
    xlTransform,
    xlWeight,
  }: Props) => ({
    className: classNames({
      [`text-${align}`]: align,
      [`text-${color}`]: color,
      [`group-hover:text-${hoverColor}`]: hoverColor,
      [`text-opacity-${opacity}`]: opacity,
      [decoration]: decoration,
      [overflow]: overflow,
      [`text-${size}`]: size,
      [transform]: transform,
      [`font-${weight}`]: weight,
      [`sm:text-${smAlign}`]: smAlign,
      [`sm:text-${smColor}`]: smColor,
      [`sm:text-opacity-${smOpacity}`]: smOpacity,
      [`sm:${smDecoration}`]: smDecoration,
      [`sm:${smOverflow}`]: smOverflow,
      [`sm:text-${smSize}`]: smSize,
      [`sm:${smTransform}`]: smTransform,
      [`sm:font-${smWeight}`]: smWeight,
      [`md:text-${mdAlign}`]: mdAlign,
      [`md:text-${mdColor}`]: mdColor,
      [`md:text-opacity-${mdOpacity}`]: mdOpacity,
      [`md:${mdDecoration}`]: mdDecoration,
      [`md:${mdOverflow}`]: mdOverflow,
      [`md:text-${mdSize}`]: mdSize,
      [`md:${mdTransform}`]: mdTransform,
      [`md:font-${mdWeight}`]: mdWeight,
      [`xl:text-${xlAlign}`]: xlAlign,
      [`xl:text-${xlColor}`]: xlColor,
      [`xl:text-opacity-${xlOpacity}`]: xlOpacity,
      [`xl:${xlDecoration}`]: xlDecoration,
      [`xl:${xlOverflow}`]: xlOverflow,
      [`xl:text-${xlSize}`]: xlSize,
      [`xl:${xlTransform}`]: xlTransform,
      [`xl:font-${xlWeight}`]: xlWeight,
    }),
  })
)<Props>``;
