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
      className={classNames(
        className,
        "bg-black z-10 backdrop-filter backdrop-blur-xl",
        {
          "rounded-3xl": !disableRound,
          "bg-opacity-40": !isF,
          "bg-gray-600": isF,
        }
      )}
      {...props}
    >
      {children}
    </Flex>
  );
};
