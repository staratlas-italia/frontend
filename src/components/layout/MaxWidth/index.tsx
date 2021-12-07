import classNames from "classnames";
import styled from "styled-components";

type WidthSize =
  | 0
  | "none"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl"
  | "full"
  | "min"
  | "max"
  | "prose"
  | "screen-sm"
  | "screen-md"
  | "screen-lg"
  | "screen-xl"
  | "screen-2xl";

type MaxWidthProps = {
  size: WidthSize;
};

type MdMaxWidthProps = {
  mdSize: WidthSize;
};

type LgMaxWidthProps = {
  lgSize: WidthSize;
};

type XlMaxWidthProps = {
  xlSize: WidthSize;
};

type Props = Partial<
  MaxWidthProps & MdMaxWidthProps & LgMaxWidthProps & XlMaxWidthProps
>;

export const MaxWidth = styled.div.attrs(
  ({ size, mdSize, lgSize, xlSize }: Props) => ({
    className: classNames({
      [`max-w-${size}`]: size,
      [`md:max-w-${mdSize}`]: mdSize,
      [`lg:max-w-${lgSize}`]: lgSize,
      [`xl:max-w-${xlSize}`]: xlSize,
    }),
  })
)<Props>``;
