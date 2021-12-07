import cx from "classnames";
import { ComponentType } from "react";
import styled from "styled-components";
import { PaneProps } from "~/components/layout/Pane";
import { Padding, PaddingProps } from "../Padding";

type Align = "center" | "end" | "start" | "baseline" | "stretch";
type Basis = string | number;
type Direction = "col" | "col-reverse" | "row" | "row-reverse";
type Grow = 0 | 1;
type Shrink = 0 | 1;
type Justify = "center" | "end" | "start" | "around" | "between" | "evenly";
type Wrap = "nowrap" | "wrap" | "wrap-reverse";

export type Flexbox = {
  align: Align;
  basis: Basis;
  direction: Direction;
  grow: Grow;
  justify: Justify;
  shrink: Shrink;
  wrap: Wrap;
};

type MdFlexbox = {
  mdAlign: Align;
  mdBasis: Basis;
  mdDirection: Direction;
  mdGrow: Grow;
  mdJustify: Justify;
  mdShrink: Shrink;
  mdWrap: Wrap;
};

type LgFlexbox = {
  lgAlign: Align;
  lgBasis: Basis;
  lgDirection: Direction;
  lgGrow: Grow;
  lgJustify: Justify;
  lgShrink: Shrink;
  lgWrap: Wrap;
};

export type FlexProps = { as?: ComponentType | string } & Partial<
  PaddingProps & Flexbox & MdFlexbox & LgFlexbox & PaneProps
>;

export const Flex = styled(Padding).attrs<FlexProps>(
  ({
    align,
    as,
    basis,
    className,
    children,
    direction,
    grow,
    justify,
    shrink,
    wrap,
    mdAlign,
    mdBasis,
    mdDirection,
    mdGrow,
    mdJustify,
    mdShrink,
    mdWrap,
    lgAlign,
    lgBasis,
    lgDirection,
    lgGrow,
    lgJustify,
    lgShrink,
    lgWrap,
  }) => ({
    className: cx("flex", {
      [`items-${align}`]: align,
      [`flex-${direction}`]: direction,
      [`justify-${justify}`]: justify,
      [`flex-${wrap}`]: wrap,
      [`md:items-${mdAlign}`]: mdAlign,
      [`md:flex-${mdDirection}`]: mdDirection,
      [`md:justify-${mdJustify}`]: mdJustify,
      [`md:flex-${mdWrap}`]: mdWrap,
      [`lg:items-${lgAlign}`]: lgAlign,
      [`lg:flex-${lgDirection}`]: lgDirection,
      [`lg:justify-${lgJustify}`]: lgJustify,
      [`lg:flex-${lgWrap}`]: lgWrap,
      [grow === 0 ? "flex-grow-0" : "flex-grow"]: grow,
      [shrink === 0 ? "flex-shrink-0" : "flex-shrink"]: shrink,
      [mdGrow === 0 ? "md:flex-grow-0" : "md:flex-grow"]: mdGrow,
      [mdShrink === 0 ? "md:flex-shrink-0" : "md:flex-shrink"]: mdShrink,
      [lgGrow === 0 ? "lg:flex-grow-0" : "lg:flex-grow"]: lgGrow,
      [lgShrink === 0 ? "lg:flex-shrink-0" : "lg:flex-shrink"]: lgShrink,
    }),
  })
)<FlexProps>``;
