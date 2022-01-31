import classNames from "classnames";
import { Flex } from "~/components/layout/Flex";
import { Disclaimer } from "~/components/layout/Footer/components/Disclaimer";
import { Links } from "~/components/layout/Footer/components/Links";

export const Footer = () => (
  <Flex align="center" grow={1} py={5} px={5} justify="center">
    <Flex
      align="center"
      className={classNames("z-10 w-full container")}
      justify="between"
    >
      <Disclaimer />
      <Links />
    </Flex>
  </Flex>
);
