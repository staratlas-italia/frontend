import cx from "classnames";
import { ComponentType } from "react";
import styled from "styled-components";
import { Flexbox, LgFlexbox, MdFlexbox } from "~/components/layout/Flex/types";
import { getAlignClasses } from "~/components/layout/Flex/utils/getAlignClasses";
import { getDirectionClasses } from "~/components/layout/Flex/utils/getDirectionClasses";
import { getGrowClasses } from "~/components/layout/Flex/utils/getGrowClasses";
import { getJustifyClasses } from "~/components/layout/Flex/utils/getJustifyClasses";
import { getShrinkClasses } from "~/components/layout/Flex/utils/getShrinkClasses";
import { getWrapClasses } from "~/components/layout/Flex/utils/getWrapClasses";
import { PaneProps } from "~/components/layout/Pane";
import { Padding, PaddingProps } from "../Padding";

export type FlexProps = { as?: ComponentType | string } & Partial<
  PaddingProps & Flexbox & MdFlexbox & LgFlexbox & XlFlexbox & PaneProps
>;

export const Flex = styled(Padding).attrs<FlexProps>(
  ({
    align,
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
    xlAlign,
    xlBasis,
    xlDirection,
    xlGrow,
    xlJustify,
    xlShrink,
    xlWrap,
  }) => ({
    className: cx(
      "flex",
      getAlignClasses({ align }),
      getAlignClasses({ align: mdAlign, size: "md" }),
      getAlignClasses({ align: lgAlign, size: "lg" }),
      getDirectionClasses({ direction }),
      getDirectionClasses({ direction: mdDirection, size: "md" }),
      getDirectionClasses({ direction: lgDirection, size: "lg" }),
      getJustifyClasses({ justify }),
      getJustifyClasses({ justify: mdJustify, size: "md" }),
      getJustifyClasses({ justify: lgJustify, size: "lg" }),
      getWrapClasses({ wrap }),
      getWrapClasses({ wrap: mdWrap, size: "md" }),
      getWrapClasses({ wrap: lgWrap, size: "lg" }),
      getGrowClasses({ grow }),
      getGrowClasses({ grow: mdGrow, size: "md" }),
      getGrowClasses({ grow: lgGrow, size: "lg" }),
      getShrinkClasses({ shrink }),
      getShrinkClasses({ shrink: mdShrink, size: "md" }),
      getShrinkClasses({ shrink: lgShrink, size: "lg" })
    ),
  })
)<FlexProps>``;
