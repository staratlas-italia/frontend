import { useMemo } from "react";
import { StarAtlasEntity } from "~/components/cards/Ship/types";
import { InfoRow } from "~/components/common/Info";
import { Flex } from "~/components/layout/Flex";
import { useEntityPrice } from "~/hooks/useEntityPrice";
import { useEntityVwapPrice } from "~/hooks/useEntityVwapPrice";

type Props = { ship: StarAtlasEntity };

export const ShipPrices = ({ ship }: Props) => {
  const vwap = useEntityVwapPrice(ship);

  const { loading, price } = useEntityPrice(ship);

  const { loading: atlasLoading, price: atlasPrice } = useEntityPrice(
    ship,
    "ATLAS"
  );

  const discount = useMemo(() => {
    if (!price || !vwap) return null;

    const value = (1 - parseFloat(price) / vwap) * 100;

    if (value > 0) {
      return `${value.toFixed(2)}% Discount`;
    }
    return `${Math.abs(value).toFixed(2)}% Premium`;
  }, [price, vwap]);

  return (
    <Flex className="grid grid-cols-2 lg:grid-cols-4  gap-5">
      <InfoRow loading={loading} title="USDC Price">
        {parseFloat(price).toFixed(2)}$
      </InfoRow>
      <InfoRow loading={atlasLoading} title="ATLAS Price">
        {parseFloat(atlasPrice).toFixed(2)}
      </InfoRow>
      <InfoRow title="VWAP Price">{vwap?.toFixed(2)}$</InfoRow>

      <InfoRow title="VWAP vs Price">{discount}</InfoRow>
    </Flex>
  );
};
