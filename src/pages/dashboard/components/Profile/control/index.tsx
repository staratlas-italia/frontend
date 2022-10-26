import { InfoRow } from "~/components/common/Info";
import { Price } from "~/components/common/Price";
import { Text } from "~/components/common/Text";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Flex } from "~/components/layout/Flex";
import { usePlayerStore } from "~/stores/usePlayerStore";
import { shortenAddress } from "~/utils/shortenAddress";
import { CreatePlayerBanner } from "../CreatePlayerBanner";
import { LinkDiscordButton } from "~/components/LinkDiscordButton";

export const Profile = () => {
  const player = usePlayerStore((s) => s.player);
  const self = usePlayerStore((s) => s.self);

  if (player === null) {
    return <CreatePlayerBanner />;
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
        <Flex
          justify="center"
          lgJustify="start"
          className="w-full lg:w-64 max-w-sm"
        >
          {avatarImageUrl && (
            <img
              className="rounded-xl overflow-hidden w-full lg:w-64 lg:h-64"
              src={avatarImageUrl}
              alt={avatarId}
            />
          )}
        </Flex>
        <Flex align="center" className="grid grid-cols-2 gap-5">
          <InfoRow color="text-gray-200" title="addr">
            <Text color="text-white" xlSize="4xl">
              {shortenAddress(player?.publicKey || "")}
            </Text>
          </InfoRow>
          <InfoRow color="text-gray-200" title="universal Rank">
            <Text color="text-white">{rank}</Text>
          </InfoRow>
          <InfoRow color="text-gray-200" title="faction rank">
            <Text color="text-white">{factionRank}</Text>
          </InfoRow>
          <InfoRow color="text-gray-200" title="net worth">
            <Price color="text-white" value={balance} />
          </InfoRow>

          <LinkDiscordButton />
        </Flex>
      </BlurBackground>
    </Flex>
  );
};
