import Image from "next/image";
import { InfoRow } from "~/components/common/Info";
import { Loader } from "~/components/common/Loader";
import { Price } from "~/components/common/Price";
import { Text } from "~/components/common/Text";
import { Button } from "~/components/controls/Button";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Flex } from "~/components/layout/Flex";
import { useModal } from "~/contexts/ModalContext";
import { usePlayer } from "~/hooks/usePlayer";
import {
  useAtlasBalance,
  usePolisBalance,
  useUsdcBalance,
} from "~/hooks/useTokenBalance";
import { shortenAddress } from "~/utils/shortenAddress";

export const View = () => {
  const { amount: atlasAmount } = useAtlasBalance();
  const { amount: polisAmount } = usePolisBalance();
  const { amount: usdcAmount } = useUsdcBalance();

  const { player, loading, publicKey } = usePlayer();

  const { setVisible } = useModal("ships-modal");

  if (!player || loading) {
    return <Loader />;
  }

  const { avatarId, avatarImageUrl, balance, rank, factionRank } = player;

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
                    quality={30}
                    src={avatarImageUrl}
                    width={200}
                    height={200}
                    alt={avatarId}
                  />
                </Flex>
              )}
              <Flex justify={"between"} className="w-full">
                <InfoRow color="gray-200" title="addr">
                  <Text color="white">{shortenAddress(publicKey || "")}</Text>
                </InfoRow>
                <InfoRow color="gray-200" title="universal Rank">
                  <Text color="white">{rank}</Text>
                </InfoRow>
                <InfoRow color="gray-200" title="faction rank">
                  <Text color="white">{factionRank}</Text>
                </InfoRow>
                <InfoRow color="gray-200" title="net worth">
                  <Price color="white" value={balance} />
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
                  <Button onClick={() => setVisible(true)}>
                    <Text color="pink-300" className="underline">
                      add a new one
                    </Text>
                  </Button>
                </Text>
              </Flex>
            </Flex>
          </BlurBackground>
        </Flex>
      </Flex>
    </>
  );
};
