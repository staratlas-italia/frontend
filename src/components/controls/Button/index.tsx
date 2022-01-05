import classNames from "classnames";
import React, { ComponentType, PropsWithChildren } from "react";
import { Loader } from "~/components/common/Loader";
import { Text } from "~/components/common/Text";
import { Flex } from "~/components/layout/Flex";
import { PaddingProps } from "~/components/layout/Padding";
import { ColorName } from "~/components/layout/Pane";

type iconRenderProp = (props: {
  className: string;
}) => ComponentType<typeof props> | JSX.Element;

type ButtonSize = "small" | "regular" | "large";

export type ButtonProps = PropsWithChildren<{
  as?: ComponentType | string;
  bgColor?: ColorName;
  className?: string;
  hoverBgColor?: ColorName;
  hoverTextColor?: ColorName;
  iconLeft?: iconRenderProp;
  iconRight?: iconRenderProp;
  loading?: boolean;
  onClick?: () => void;
  size?: ButtonSize;
  textColor?: ColorName;
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

export const Button = ({
  as,
  bgColor,
  children,
  className,
  hoverBgColor,
  hoverTextColor,
  iconLeft,
  iconRight,
  loading,
  size = "regular",
  textColor = "black",
  ...props
}: ButtonProps) => {
  return (
    <Flex
      as={as || "button"}
      align="center"
      justify="between"
      className={classNames(className, "group rounded-md", {
        [`hover:bg-${hoverBgColor}`]: hoverBgColor,
      })}
      color={bgColor}
      {...getButtonSize(size)}
      {...props}
    >
      {iconLeft && (
        <Flex pr={5}>
          {iconLeft({ className: `h-5 w-5 text-${textColor}` })}
        </Flex>
      )}

      <Text
        size="base"
        align="center"
        mdSize="lg"
        weight="medium"
        className="w-full"
        color={textColor}
        hoverColor={hoverTextColor}
      >
        {children}
      </Text>
      {loading && <Loader />}

      {iconRight && (
        <Flex pl={5}>
          {iconRight({ className: `h-5 w-5 text-${textColor}` })}
        </Flex>
      )}
    </Flex>
  );
};
