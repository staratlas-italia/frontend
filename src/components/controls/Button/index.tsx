import classNames from "classnames";
import { ComponentType, PropsWithChildren } from "react";
import { Loader } from "~/components/common/Loader";
import { Text } from "~/components/common/Text";
import { TextColor } from "~/components/common/Text/types";
import { Flex } from "~/components/layout/Flex";
import { PaddingProps } from "~/components/layout/Padding";
import { iconRenderProp } from "~/types";

type ButtonSize = "small" | "regular" | "large";

export type ButtonProps = PropsWithChildren<{
  as?: ComponentType | string;
  className?: string;
  iconLeft?: iconRenderProp;
  iconRight?: iconRenderProp;
  loading?: boolean;
  onClick?: () => void;
  size?: ButtonSize;
  round?: boolean;
  textColor?: TextColor;
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
  children,
  className,
  iconLeft,
  iconRight,
  loading,
  size = "regular",
  round,
  textColor = "text-black",
  ...props
}: ButtonProps) => {
  return (
    <Flex
      as={as || "button"}
      align="center"
      justify={"between"}
      className={classNames(className, "group rounded-md", {
        "w-5 h-5": round,
      })}
      {...(round ? undefined : getButtonSize(size))}
      {...props}
    >
      {iconLeft && (
        <Flex pr={5}>{iconLeft({ className: `h-5 w-5 ${textColor}` })}</Flex>
      )}

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
      {loading && <Loader />}

      {iconRight && (
        <Flex pl={5}>{iconRight({ className: `h-5 w-5 ${textColor}` })}</Flex>
      )}
    </Flex>
  );
};
