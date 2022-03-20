import Link from "next/link";
import { Text } from "~/components/common/Text";
import { Flex } from "~/components/layout/Flex";
import { Translation } from "~/i18n/Translation";
import { getRoute } from "~/utils/getRoute";

export const MintBanner = () => {
  if (new Date() > new Date("2022-03-21:12:00:00.000Z")) {
    return null;
  }

  return (
    <Flex justify="center" pb={5}>
      <Flex
        align="center"
        px={5}
        py={3}
        color="white"
        className="rounded-lg w-full xl:max-w-2xl space-x-2"
        justify="between"
        direction="col"
        mdDirection="row"
      >
        <Flex direction="col">
          <Text weight="semibold">
            <Translation id="MintBanner.title" />
          </Text>
          <Text>
            <Translation id="MintBanner.subtitle" />
          </Text>
        </Flex>
        <Link href={getRoute("/mint")}>
          <a className="underline cursor-pointer text-right">
            <Translation id="MintBanner.action.title" />
          </a>
        </Link>
      </Flex>
    </Flex>
  );
};
