import { useMemo } from "react";
import { InfoRow } from "~/components/common/Info";
import { Price } from "~/components/common/Price";
import { Text } from "~/components/common/Text";
import { Flex } from "~/components/layout/Flex";
import { useAtlasPrice } from "~/hooks/useAtlasPrice";
import { useEntityBestPrices } from "~/hooks/useEntityBestPrices";
import { useEntityVwapPrice } from "~/hooks/useEntityVwapPrice";

export const ShipPrices = () => {
  const vwap = useEntityVwapPrice();

  const { price: atlasUsdcValue } = useAtlasPrice();

  const {
    bestAskPrice,
    bestBidPrice,
    loading,
    avgPrice: price,
  } = useEntityBestPrices();

  const {
    bestAskPrice: bestAskPriceAtlas,
    bestBidPrice: bestBidPriceAtlas,
    avgPrice: atlasPrice,
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
      <InfoRow loading={loading} title="USDC AVG Price">
        <Price value={price} />
      </InfoRow>

      <InfoRow loading={loading} title="USDC Best Ask Price">
        <Price value={bestAskPrice} />
      </InfoRow>

      <InfoRow loading={loading} title="USDC Best Bid Price">
        <Price value={bestBidPrice} />
      </InfoRow>

      <InfoRow title="VWAP Price">
        <Price value={vwap} />
      </InfoRow>

      <InfoRow title="VWAP vs Price">
        {priceVsVwapDiscount && (
          <Text
            as="span"
            color={
              priceVsVwapDiscount > 0 ? "text-emerald-300" : "text-red-300"
            }
          >
            {Math.abs(priceVsVwapDiscount).toFixed(2)}%{" "}
            {priceVsVwapDiscount > 0 ? "Discount" : "Premium"}
          </Text>
        )}
      </InfoRow>

      <InfoRow loading={atlasLoading} title="ATLAS AVG Price">
        <Price currency="ATLAS" value={atlasPrice} />
      </InfoRow>

      <InfoRow loading={atlasLoading} title="ATLAS Best Ask Price">
        <Price currency="ATLAS" value={bestAskPriceAtlas} />
      </InfoRow>

      <InfoRow loading={atlasLoading} title="ATLAS Best Bid Price">
        <Price currency="ATLAS" value={bestBidPriceAtlas} />
      </InfoRow>

      <InfoRow title="Atlas Price vs Price">
        {priceVsAtlasDiscount && (
          <Text
            as="span"
            color={
              priceVsAtlasDiscount > 0 ? "text-emerald-300" : "text-red-300"
            }
          >
            {Math.abs(priceVsAtlasDiscount).toFixed(2)}%{" "}
            {priceVsAtlasDiscount > 0 ? "Discount" : "Premium"}
          </Text>
        )}
      </InfoRow>
    </Flex>
  );
};
