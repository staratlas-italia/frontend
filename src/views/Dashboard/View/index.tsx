import Image from "next/image";
import Link from "next/link";
import { InfoRow } from "~/components/common/Info";
import { Price } from "~/components/common/Price";
import { Text } from "~/components/common/Text";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Flex } from "~/components/layout/Flex";
import { usePlayer } from "~/hooks/usePlayer";
import {
  useAtlasBalance,
  usePolisBalance,
  useUsdcBalance,
} from "~/hooks/useTokenBalance";

export const View = () => {
  const { amount: atlasAmount } = useAtlasBalance();
  const { amount: polisAmount } = usePolisBalance();
  const { amount: usdcAmount } = useUsdcBalance();

  const { avatarId, avatarImageUrl } = usePlayer();

  return (
    <>
      <Flex className="space-y-3" direction="col">
        {/* <Flex>
          <BlurBackground px={3} py={2}>
            <AtlasUsdcChange />
          </BlurBackground>
        </Flex> */}
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
          <BlurBackground
            px={5}
            py={5}
            color="gray-600"
            className="space-y-3"
            direction="col"
          >
            <Flex className="space-x-5">
              {avatarImageUrl && (
                <Flex>
                  <Image
                    src={avatarImageUrl}
                    width={120}
                    height={120}
                    alt={avatarId}
                  />
                </Flex>
              )}
              <Flex>
                <InfoRow title="publicKey">
                  <Text color="white">{avatarId}</Text>
                </InfoRow>
              </Flex>
            </Flex>
            <Flex direction="col">
              <Text
                color="white"
                size="4xl"
                transform="uppercase"
                weight="bold"
              >
                Your fleet
              </Text>
              <Flex justify="center">
                <Text color="white" size="lg">
                  No ships found...{" "}
                  <Link href="#">
                    <a>
                      <Text color="pink-300" className="underline">
                        add a new one
                      </Text>
                    </a>
                  </Link>
                </Text>
              </Flex>
            </Flex>
          </BlurBackground>
        </Flex>
      </Flex>
    </>
  );
};
