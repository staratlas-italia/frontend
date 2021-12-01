import cx from "classnames";
import React from "react";
import { Padding, PaddingProps } from "../Padding";

type Align = "center" | "end" | "start" | "baseline" | "stretch";

type Direction = "column" | "column-reverse" | "row" | "row-reverse";
type Grow = boolean;
type Shrink = boolean;
type Justify = "center" | "end" | "start" | "space-around" | "space-between";
type Wrap = "nowrap" | "wrap" | "wrap-reverse";

export type Flexbox = {
  align: Align;
  direction: Direction;
  grow: Grow;
  justify: Justify;
  shrink: Shrink;
  wrap: Wrap;
};

type MdFlexbox = {
  mdAlign: Align;
  mdDirection: Direction;
  mdGrow: Grow;
  mdJustify: Justify;
  mdShrink: Shrink;
  mdWrap: Wrap;
};

type LgFlexbox = {
  lgAlign: Align;
  lgDirection: Direction;
  lgGrow: Grow;
  lgJustify: Justify;
  lgShrink: Shrink;
  lgWrap: Wrap;
};

type Props = Partial<PaddingProps & Flexbox & MdFlexbox & LgFlexbox>;

export const Flex = ({
  align,
  className,
  children,
  direction,
  grow,
  justify,
  shrink,
  wrap,
  mdAlign,
  mdDirection,
  mdGrow,
  mdJustify,
  mdShrink,
  mdWrap,
  lgAlign,
  lgDirection,
  lgGrow,
  lgJustify,
  lgShrink,
  lgWrap,
  ...props
}: Props) => {
  return (
    <Padding
      {...props}
      className={cx(className, "d-flex", {
        [`align-${align}`]: align,
        [`flex-${direction}`]: direction,
        [`flex-grow-1`]: grow,
        [`justify-${justify}`]: justify,
        [`flex-shrink-1`]: shrink,
        [`flex-${wrap}`]: wrap,
        [`md-align-${mdAlign}`]: mdAlign,
        [`md-flex-${mdDirection}`]: mdDirection,
        [`md-flex-grow-1`]: mdGrow,
        [`md-justify-${mdJustify}`]: mdJustify,
        [`md-flex-shrink-1`]: mdShrink,
        [`md-flex-${mdWrap}`]: mdWrap,
        [`lg-align-${lgAlign}`]: lgAlign,
        [`lg-flex-${lgDirection}`]: lgDirection,
        [`lg-flex-grow-1`]: lgGrow,
        [`lg-justify-${lgJustify}`]: lgJustify,
        [`lg-flex-shrink-1`]: lgShrink,
        [`lg-flex-${lgWrap}`]: lgWrap,
      })}
    >
      {children}
    </Padding>
  );
};
