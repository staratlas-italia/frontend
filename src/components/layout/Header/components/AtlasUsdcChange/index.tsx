import { InfoRow } from "~/components/common/Info";
import { Price } from "~/components/common/Price";
import { Text } from "~/components/common/Text";
import { Flex } from "~/components/layout/Flex";
import { useAtlasPrice } from "~/hooks/useAtlasPrice";
import { useTranslation } from "~/i18n/useTranslation";

type Props = {};

export const AtlasUsdcChange = () => {
  const { loading, price } = useAtlasPrice();
  const atlasChangeTranslation = useTranslation("Layout.AtlasChange.title");

  return (
    <InfoRow loading={loading} title={atlasChangeTranslation}>
      <Flex align="center" className="space-x-2">
        <Price color="white" currency="ATLAS" decimals={3} value={1} />
        <Text color="white">=</Text>
        <Price color="white" decimals={3} value={price} />
      </Flex>
    </InfoRow>
  );
};
