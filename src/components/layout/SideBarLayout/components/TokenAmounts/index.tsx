import { Price } from "~/components/common/Price";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { usePlayerStore } from "~/stores/usePlayerStore";

export const TokenAmounts = () => {
  const [atlasAmount, polisAmount, usdcAmount] = usePlayerStore(
    (s) => s.amounts
  );

  return (
    <BlurBackground
      wrap="wrap"
      px={3}
      py={2}
      className="lg:space-x-3 space-x-2"
    >
      <Price
        color="text-white"
        currency="ATLAS"
        inverse
        size="xl"
        value={atlasAmount}
      />
      <Price
        color="text-white"
        currency="POLIS"
        inverse
        size="xl"
        value={polisAmount}
      />
      <Price
        color="text-white"
        currency="USDC"
        inverse
        size="xl"
        value={usdcAmount}
      />
    </BlurBackground>
  );
};
