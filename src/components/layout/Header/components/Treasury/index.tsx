import { Price } from "~/components/common/Price";
import { Text } from "~/components/common/Text";
import { Flex } from "~/components/layout/Flex";
import { useGuildTreasury } from "~/hooks/useGuildTreasury";
import { Translation } from "~/i18n/Translation";

export const Treasury = () => {
  const {
    loading,
    treasury: { usdcAmount },
  } = useGuildTreasury();

  if (!loading && !usdcAmount) {
    return null;
  }

  return (
    <Flex
      direction="row"
      mdDirection="col"
      align="center"
      mdAlign="start"
      justify="between"
      className="md:space-y-2 w-full"
    >
      <Text
        color="text-white"
        className="w-min"
        size="xl"
        transform="uppercase"
        weight="semibold"
      >
        <Translation id="Layout.Treasury.title" />
      </Text>
      <Price
        size="4xl"
        weight="bold"
        color="text-white"
        value={usdcAmount}
        currency="USDC"
      />
    </Flex>
  );
};
