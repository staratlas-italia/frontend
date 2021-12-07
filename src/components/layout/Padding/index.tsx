import classNames from "classnames";
import { PropsWithChildren, ReactNode } from "react";
import styled from "styled-components";
import { Spacing } from "~/common/spacing";
import { Pane } from "~/components/layout/Pane";

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
  Partial<Padding & MdPadding & LgPadding> & { Component?: ReactNode }
>;

export const Padding = styled(Pane).attrs(
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
    className: classNames({
      [`p-${p}`]: p,
      [`pt-${pt}`]: pt,
      [`pb-${pb}`]: pb,
      [`pl-${pl}`]: pl,
      [`pr-${pr}`]: pr,
      [`px-${px}`]: px,
      [`py-${py}`]: py,
      [`md:p-${mdP}`]: mdP,
      [`md:pt-${mdPt}`]: mdPt,
      [`md:pb-${mdPb}`]: mdPb,
      [`md:pl-${mdPl}`]: mdPl,
      [`md:pr-${mdPr}`]: mdPr,
      [`md:px-${mdPx}`]: mdPx,
      [`md:py-${mdPy}`]: mdPy,
      [`lg:p-${lgP}`]: lgP,
      [`lg:pt-${lgPt}`]: lgPt,
      [`lg:pb-${lgPb}`]: lgPb,
      [`lg:pl-${lgPl}`]: lgPl,
      [`lg:pr-${lgPr}`]: lgPr,
      [`lg:px-${lgPx}`]: lgPx,
      [`lg:py-${lgPy}`]: lgPy,
    }),
  })
)``;
