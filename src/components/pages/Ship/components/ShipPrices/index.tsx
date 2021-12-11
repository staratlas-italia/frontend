import { useMemo } from "react";
import { InfoRow } from "~/components/common/Info";
import { Text } from "~/components/common/Text";
import { Flex } from "~/components/layout/Flex";
import { useAtlasPrice } from "~/hooks/useAtlasPrice";
import { useEntityBestPrices } from "~/hooks/useEntityBestPrices";
import { useEntityVwapPrice } from "~/hooks/useEntityVwapPrice";

export const ShipPrices = () => {
  const vwap = useEntityVwapPrice();

  const { price: atlasUsdcValue } = useAtlasPrice();

  const { bestAskPrice, bestBidPrice, loading, price } = useEntityBestPrices();

  const {
    bestAskPrice: bestAskPriceAtlas,
    bestBidPrice: bestBidPriceAtlas,
    price: atlasPrice,
    loading: atlasLoading,
  } = useEntityBestPrices("ATLAS");

  const priceVsVwapDiscount = useMemo(() => {
    if (!price || !vwap) return null;

    return (1 - price / vwap) * 100;
  }, [price, vwap]);

  const priceVsAtlasDiscount = useMemo(() => {
    if (!price || !atlasPrice || !atlasUsdcValue) {
      return null;
    }

    return (1 - (atlasPrice * atlasUsdcValue) / price) * 100;
  }, [price, atlasPrice, atlasUsdcValue]);

  return (
    <Flex className="grid grid-cols-2 lg:grid-cols-5  gap-5">
      <InfoRow loading={loading} title="USDC Price">
        $ {price?.toFixed(2)}
      </InfoRow>

      <InfoRow loading={loading} title="USDC Best Bid Price">
        $ {bestBidPrice?.toFixed(2)}
      </InfoRow>

      <InfoRow loading={loading} title="USDC Best Ask Price">
        $ {bestAskPrice?.toFixed(2)}
      </InfoRow>

      <InfoRow title="VWAP Price">$ {vwap?.toFixed(2)}</InfoRow>
      <InfoRow title="VWAP vs Price">
        {priceVsVwapDiscount && (
          <Text
            as="span"
            color={priceVsVwapDiscount > 0 ? "green-300" : "red-300"}
          >
            {Math.abs(priceVsVwapDiscount).toFixed(2)}%{" "}
            {priceVsVwapDiscount > 0 ? "Discount" : "Premium"}
          </Text>
        )}
      </InfoRow>

      <InfoRow loading={atlasLoading} title="ATLAS Price">
        {atlasPrice?.toFixed(2)}
      </InfoRow>

      <InfoRow loading={atlasLoading} title="ATLAS Best Bid Price">
        {bestBidPriceAtlas?.toFixed(2)}
      </InfoRow>

      <InfoRow loading={atlasLoading} title="ATLAS Best Ask Price">
        {bestAskPriceAtlas?.toFixed(2)}
      </InfoRow>
      <InfoRow title="Atlas Price vs Price">
        {priceVsAtlasDiscount && (
          <Text
            as="span"
            color={priceVsAtlasDiscount > 0 ? "green-300" : "red-300"}
          >
            {Math.abs(priceVsAtlasDiscount).toFixed(2)}%{" "}
            {priceVsAtlasDiscount > 0 ? "Discount" : "Premium"}
          </Text>
        )}
      </InfoRow>
    </Flex>
  );
};
