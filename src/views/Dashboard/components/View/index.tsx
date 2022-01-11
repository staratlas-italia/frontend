import { Price } from "~/components/common/Price";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Flex } from "~/components/layout/Flex";
import {
  useAtlasBalance,
  usePolisBalance,
  useUsdcBalance,
} from "~/hooks/useTokenBalance";
import { Profile } from "~/views/Dashboard/components/Profile";

export const View = () => {
  const { amount: atlasAmount } = useAtlasBalance();
  const { amount: polisAmount } = usePolisBalance();
  const { amount: usdcAmount } = useUsdcBalance();

  return (
    <>
      <Flex className="space-y-3" direction="col">
        <Flex className="space-y-3" direction="col">
          <Flex>
            <BlurBackground px={3} py={2} className="space-x-3">
              <Price
                color="white"
                currency="ATLAS"
                inverse
                size="xl"
                value={atlasAmount}
              />
              <Price
                color="white"
                currency="POLIS"
                inverse
                size="xl"
                value={polisAmount}
              />
              <Price
                color="white"
                currency="USDC"
                inverse
                size="xl"
                value={usdcAmount}
              />
            </BlurBackground>
          </Flex>
          <Profile />
        </Flex>
      </Flex>
    </>
  );
};
