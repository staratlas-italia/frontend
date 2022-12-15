import cx from "classnames";
import { ComponentType } from "react";
import styled from "styled-components";
import {
  Flexbox,
  LgFlexbox,
  MdFlexbox,
  XlFlexbox,
} from "~/components/layout/Flex/types";
import { getAlignClasses } from "~/components/layout/Flex/utils/getAlignClasses";
import { getDirectionClasses } from "~/components/layout/Flex/utils/getDirectionClasses";
import { getGrowClasses } from "~/components/layout/Flex/utils/getGrowClasses";
import { getJustifyClasses } from "~/components/layout/Flex/utils/getJustifyClasses";
import { getShrinkClasses } from "~/components/layout/Flex/utils/getShrinkClasses";
import { getWrapClasses } from "~/components/layout/Flex/utils/getWrapClasses";
import { Padding, PaddingProps } from "../Padding";

export type FlexProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: ComponentType | string;
} & Partial<PaddingProps & Flexbox & MdFlexbox & LgFlexbox & XlFlexbox>;

export const Flex = styled(Padding)
  // .withConfig({
  //   shouldForwardProp: (prop, defaultValidatorFn) =>
  //     !["direction"].includes(prop) && defaultValidatorFn(prop),
  // })
  .attrs<FlexProps>(
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
        getAlignClasses({ align: xlAlign, size: "xl" }),
        getDirectionClasses({ direction }),
        getDirectionClasses({ direction: mdDirection, size: "md" }),
        getDirectionClasses({ direction: lgDirection, size: "lg" }),
        getDirectionClasses({ direction: xlDirection, size: "xl" }),
        getJustifyClasses({ justify }),
        getJustifyClasses({ justify: mdJustify, size: "md" }),
        getJustifyClasses({ justify: lgJustify, size: "lg" }),
        getJustifyClasses({ justify: xlJustify, size: "xl" }),
        getWrapClasses({ wrap }),
        getWrapClasses({ wrap: mdWrap, size: "md" }),
        getWrapClasses({ wrap: lgWrap, size: "lg" }),
        getWrapClasses({ wrap: xlWrap, size: "xl" }),
        getGrowClasses({ grow }),
        getGrowClasses({ grow: mdGrow, size: "md" }),
        getGrowClasses({ grow: lgGrow, size: "lg" }),
        getGrowClasses({ grow: xlGrow, size: "xl" }),
        getShrinkClasses({ shrink }),
        getShrinkClasses({ shrink: mdShrink, size: "md" }),
        getShrinkClasses({ shrink: lgShrink, size: "lg" }),
        getShrinkClasses({ shrink: xlShrink, size: "xl" })
      ),
    })
  )<FlexProps>``;
