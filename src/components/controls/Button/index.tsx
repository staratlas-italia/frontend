import classNames from "classnames";
import { ComponentType, PropsWithChildren } from "react";
import styled, { css } from "styled-components";
import { Loader } from "~/components/common/Loader";
import { Text } from "~/components/common/Text";
import { TextColor } from "~/components/common/Text/types";
import { Flex, FlexProps } from "~/components/layout/Flex";
import { PaddingProps } from "~/components/layout/Padding";
import { iconRenderProp } from "~/types";

type ButtonKind = "neutral" | "primary" | "secondary" | "dark" | "tertiary";
type ButtonSize = "small" | "regular" | "large";

export type ButtonProps = PropsWithChildren<{
  as?: keyof JSX.IntrinsicElements | ComponentType<any>;
  kind?: ButtonKind;
  className?: string;
  disabled?: boolean;
  iconLeft?: iconRenderProp;
  iconRight?: iconRenderProp;
  loading?: boolean;
  onClick?: () => void;
  size?: ButtonSize;
  round?: boolean;
  textColor?: TextColor;
  type?: "submit";
}>;

const getButtonSize = (size?: ButtonSize): Partial<PaddingProps> => {
  switch (size) {
    case "small":
      return {
        px: 3,
        py: 2,
      };
    case "regular":
      return {
        px: 6,
        py: 3,
        mdPy: 4,
        mdPx: 8,
      };
    case "large":
      return {
        px: 8,
        py: 4,
        mdPy: 5,
        mdPx: 10,
      };
  }
  return {};
};

const getButtonHeight = ({ size }: Pick<ButtonProps, "size">) => {
  switch (size) {
    case "small":
      return css`
        height: 44px;
      `;
    case "large":
      return css`
        height: 68px;
      `;
    default:
      return css`
        height: 60px;
      `;
  }
};

const styleProps: Record<
  ButtonKind,
  Pick<ButtonProps, "className" | "textColor">
> = {
  dark: {
    className: "bg-gray-800 hover:bg-gray-900",
    textColor: "text-white",
  },
  primary: {
    className: "bg-indigo-500 hover:bg-indigo-600",
    textColor: "text-white",
  },
  secondary: {
    className: "bg-emerald-100 hover:bg-emerald-200",
    textColor: "text-emerald-700",
  },
  tertiary: {
    className: "bg-indigo-100 hover:bg-indigo-200",
    textColor: "text-indigo-700",
  },
  neutral: {
    className: "bg-white hover:bg-gray-100 rounded-xl",
  },
};

type WrapperProps = FlexProps &
  Pick<ButtonProps, "size" | "loading" | "round"> & {
    disabled?: boolean;
  };

const Wrapper = styled(Flex).withConfig({
  shouldForwardProp: (prop, defaultShouldForwardProp) =>
    !["size", "loading", "round"].includes(prop) &&
    defaultShouldForwardProp(prop),
})<WrapperProps>`
  ${getButtonHeight}

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
    `}
`;

export const Button = ({
  as = "button",
  children,
  kind = "neutral",
  className,
  disabled,
  iconLeft,
  iconRight,
  loading,
  size = "regular",
  round,
  textColor: propTextColor = "text-black",
  type,
  ...props
}: ButtonProps) => {
  const { className: kindClassName, textColor: kindTextColor } =
    styleProps[kind];

  const textColor = kindTextColor || propTextColor;

  return (
    <Wrapper
      as={as}
      size={size}
      disabled={disabled}
      className={classNames(className, kindClassName, "group rounded-md", {
        "w-5 h-5": round,
        "opacity-80": disabled,
      })}
      type={type}
      align="center"
      justify="center"
      {...(round ? undefined : getButtonSize(size))}
      {...props}
    >
      {iconLeft && (
        <Flex pr={2}>{iconLeft({ className: `h-5 w-5 ${textColor}` })}</Flex>
      )}

      {loading ? (
        <Loader color={textColor} />
      ) : (
        <Text
          hover
          size="base"
          align="center"
          mdSize="lg"
          weight="semibold"
          className="w-full"
          color={textColor}
        >
          {children}
        </Text>
      )}

      {iconRight && (
        <Flex pl={2}>{iconRight({ className: `h-5 w-5 ${textColor}` })}</Flex>
      )}
    </Wrapper>
  );
};
