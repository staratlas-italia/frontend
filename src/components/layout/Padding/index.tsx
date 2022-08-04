import classNames from "classnames";
import { PropsWithChildren } from "react";
import styled from "styled-components";
import { Spacing } from "~/common/spacing";
import { getPaddingBottomClasses } from "~/components/layout/Padding/utils/getPaddingBottomClasses";
import { getPaddingClasses } from "~/components/layout/Padding/utils/getPaddingClasses";
import { getPaddingLeftClasses } from "~/components/layout/Padding/utils/getPaddingLeftClasses";
import { getPaddingRightClasses } from "~/components/layout/Padding/utils/getPaddingRightClasses";
import { getPaddingTopClasses } from "~/components/layout/Padding/utils/getPaddingTopClasses";
import { getPaddingXClasses } from "~/components/layout/Padding/utils/getPaddingXClasses";
import { getPaddingYClasses } from "~/components/layout/Padding/utils/getPaddingYClasses";
import { StrictReactNode } from "~/types";

type Padding = {
  p: Spacing;
  pt: Spacing;
  pb: Spacing;
  pl: Spacing;
  pr: Spacing;
  px: Spacing;
  py: Spacing;
};

type MdPadding = {
  mdP: Spacing;
  mdPt: Spacing;
  mdPb: Spacing;
  mdPl: Spacing;
  mdPr: Spacing;
  mdPx: Spacing;
  mdPy: Spacing;
};

type LgPadding = {
  lgP: Spacing;
  lgPt: Spacing;
  lgPb: Spacing;
  lgPl: Spacing;
  lgPr: Spacing;
  lgPx: Spacing;
  lgPy: Spacing;
};

export type PaddingProps = PropsWithChildren<
  Partial<Padding & MdPadding & LgPadding> & { Component?: StrictReactNode }
>;

export const Padding = styled.div.attrs(
  ({
    p,
    pt,
    pb,
    pl,
    pr,
    px,
    py,
    mdP,
    mdPt,
    mdPb,
    mdPl,
    mdPr,
    mdPx,
    mdPy,
    lgP,
    lgPt,
    lgPb,
    lgPl,
    lgPr,
    lgPx,
    lgPy,
  }: PaddingProps) => ({
    className: classNames(
      getPaddingClasses({ space: p }),
      getPaddingClasses({ space: mdP, size: "md" }),
      getPaddingClasses({ space: lgP, size: "lg" }),
      getPaddingTopClasses({ space: pt }),
      getPaddingTopClasses({ space: mdPt, size: "md" }),
      getPaddingTopClasses({ space: lgPt, size: "lg" }),
      getPaddingRightClasses({ space: pr }),
      getPaddingRightClasses({ space: mdPr, size: "md" }),
      getPaddingRightClasses({ space: lgPr, size: "lg" }),
      getPaddingBottomClasses({ space: pb }),
      getPaddingBottomClasses({ space: mdPb, size: "md" }),
      getPaddingBottomClasses({ space: lgPb, size: "lg" }),
      getPaddingLeftClasses({ space: pl }),
      getPaddingLeftClasses({ space: mdPl, size: "md" }),
      getPaddingLeftClasses({ space: lgPl, size: "lg" }),
      getPaddingXClasses({ space: px }),
      getPaddingXClasses({ space: mdPx, size: "md" }),
      getPaddingXClasses({ space: lgPx, size: "lg" }),
      getPaddingYClasses({ space: py }),
      getPaddingYClasses({ space: mdPy, size: "md" }),
      getPaddingYClasses({ space: lgPy, size: "lg" })
    ),
  })
)``;
