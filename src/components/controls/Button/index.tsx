import classNames from "classnames";
import React, { ComponentType } from "react";
import { Text } from "~/components/common/Text";
import { Flex } from "~/components/layout/Flex";
import { ColorName } from "~/components/layout/Pane";

type iconRenderProp = (props: {
  className: string;
}) => ComponentType<typeof props> | JSX.Element;

export type ButtonProps = {
  as?: ComponentType | string;
  bgColor?: ColorName;
  hoverBgColor?: ColorName;
  hoverTextColor?: ColorName;
  children: string;
  className?: string;
  onClick?: () => void;
  iconLeft?: iconRenderProp;
  iconRight?: iconRenderProp;
  textColor?: ColorName;
};

export const Button = ({
  as,
  bgColor = "white",
  hoverBgColor = "gray-800",
  children,
  iconLeft,
  iconRight,
  textColor = "black",
  hoverTextColor,
  className,
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
      px={8}
      py={3}
      mdPy={4}
      color={bgColor}
      {...props}
    >
      {iconLeft && (
        <Flex pr={5}>
          {iconLeft({ className: `h-5 w-5 text-${textColor}` })}
        </Flex>
      )}

      <Text
        size="base"
        mdSize="lg"
        weight="medium"
        color={textColor}
        hoverColor={hoverTextColor}
      >
        {children}
      </Text>

      {iconRight && (
        <Flex pl={5}>
          {iconRight({ className: `h-5 w-5 text-${textColor}` })}
        </Flex>
      )}
    </Flex>
  );
};
