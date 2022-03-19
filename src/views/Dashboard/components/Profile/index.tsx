import Image from "next/image";
import { InfoRow } from "~/components/common/Info";
import { Price } from "~/components/common/Price";
import { Text } from "~/components/common/Text";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Flex } from "~/components/layout/Flex";
import { LoadingView } from "~/components/LoadingView";
import { usePlayerStore } from "~/stores/usePlayerStore";
import { shortenAddress } from "~/utils/shortenAddress";

export const Profile = () => {
  const player = usePlayerStore((s) => s.current);
  const isPlayer = usePlayerStore((s) => s.isPlayer);

  if (!player) {
    return <LoadingView />;
  }

  if (isPlayer === false) {
    return (
      <BlurBackground
        direction="col"
        lgDirection="row"
        px={5}
        py={5}
        className="space-x-5"
      >
        <Text>Not a player</Text>
      </BlurBackground>
    );
  }

  const { avatarId, avatarImageUrl, balance, rank, factionRank } = player;

  return (
    <Flex>
      <BlurBackground
        direction="col"
        lgDirection="row"
        px={5}
        py={5}
        className="space-y-5 lg:space-x-5"
      >
        {avatarImageUrl && (
          <Flex
            justify="center"
            className="relative w-full h-64 lg:w-64 lg:h-64"
          >
            <Image
              className="rounded-xl overflow-hidden"
              quality={30}
              src={avatarImageUrl}
              layout="fill"
              alt={avatarId}
            />
          </Flex>
        )}
        <Flex align="center" className="grid grid-cols-2 gap-5">
          <InfoRow color="gray-200" title="addr">
            <Text color="white" xlSize="4xl">
              {shortenAddress(player?.publicKey || "")}
            </Text>
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
      </BlurBackground>
    </Flex>
  );
};
