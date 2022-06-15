import { useRouter } from "next/router";
import { Flex } from "~/components/layout/Flex";
import { Disclaimer } from "~/components/layout/Footer/components/Disclaimer";
import { Links } from "~/components/layout/Footer/components/Links";
import { getRoute } from "~/utils/getRoute";

export const Footer = () => {
  const { pathname } = useRouter();

  if (pathname === getRoute("/mint")) {
    return null;
  }

  return (
    <Flex
      align="center"
      className="z-10 bg-white"
      grow={1}
      py={5}
      px={5}
      justify="center"
    >
      <Flex
        align="center"
        className=" w-full container space-x-3"
        justify="between"
      >
        <Disclaimer />
        <Links />
      </Flex>
    </Flex>
  );
};
