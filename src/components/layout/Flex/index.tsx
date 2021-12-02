import cx from "classnames";
import React from "react";
import styled from "styled-components";
import { Padding, PaddingProps } from "../Padding";

type Align = "center" | "end" | "start" | "baseline" | "stretch";
type Basis = string | number;
type Direction = "column" | "column-reverse" | "row" | "row-reverse";
type Grow = boolean;
type Shrink = boolean;
type Justify = "center" | "end" | "start" | "space-around" | "space-between";
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

type Props = Partial<PaddingProps & Flexbox & MdFlexbox & LgFlexbox>;

const Wrapper = styled(Padding)<Pick<Props, "basis" | "mdBasis" | "lgBasis">>`
  flex-basis: ${({ basis }) =>
    typeof basis === "number" ? `${basis}px}` : basis};

  /* @media (max-width: 576px) {
    flex-basis: ${(basis) =>
    typeof basis === "number" ? `${basis}px}` : basis};
  } */
  @media (max-width: 768px) {
    flex-basis: ${({ mdBasis }) =>
      typeof mdBasis === "number" ? `${mdBasis}px}` : mdBasis} !important;
  }

  @media (max-width: 992px) {
    flex-basis: ${({ lgBasis }) =>
      typeof lgBasis === "number" ? `${lgBasis}px}` : lgBasis} !important;
  }
`;

export const Flex = ({
  align,
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
  ...props
}: Props) => {
  return (
    <Padding
      {...props}
      // basis={basis}
      // mdBasis={mdBasis}
      // lgBasis={lgBasis}
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
