import { Price } from "~/components/common/Price";
import { Text } from "~/components/common/Text";
import { Flex } from "~/components/layout/Flex";
import { useAtlasPrice } from "~/hooks/useAtlasPrice";

export const AtlasUsdcChange = () => {
  const { loading, price } = useAtlasPrice();

  if (loading) {
    return null;
  }

  return (
    <Flex align="center" className="space-x-2">
      <Price color="white" currency="ATLAS" decimals={3} value={1} />
      <Text color="white">=</Text>
      <Price color="white" decimals={3} value={price} />
    </Flex>
  );
};
