import classNames from "classnames";
import { Flex, FlexProps } from "~/components/layout/Flex";
import { isFirefox } from "~/utils/isFirefox";

type Props = FlexProps & { className?: string } & { disableRound?: boolean };

export const BlurBackground = ({
  className,
  children,
  disableRound,
  ...props
}: Props) => {
  const isF = isFirefox();
  return (
    <Flex
      color="black"
      className={classNames(
        className,
        "z-20 backdrop-filter backdrop-blur-xl",
        {
          "rounded-3xl": !disableRound,
          "bg-opacity-20": !isF,
          "bg-gray-700": isF,
        }
      )}
      {...props}
    >
      {children}
    </Flex>
  );
};
