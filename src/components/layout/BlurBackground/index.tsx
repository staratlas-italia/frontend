import classNames from "classnames";
import { Flex, FlexProps } from "~/components/layout/Flex";

type Props = FlexProps & { className?: string } & { disableRound?: boolean };

export const BlurBackground = ({
  className,
  children,
  disableRound,
  ...props
}: Props) => (
  <Flex
    color="black"
    className={classNames(
      className,
      "backdrop-filter backdrop-blur-xl bg-opacity-20",
      { "rounded-3xl": !disableRound }
    )}
    {...props}
  >
    {children}
  </Flex>
);
