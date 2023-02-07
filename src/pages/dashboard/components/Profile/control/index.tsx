import Image from "next/image";
import { InfoRow } from "~/components/common/Info";
import { Price } from "~/components/common/Price";
import { Text } from "~/components/common/Text";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Flex } from "~/components/layout/Flex";
import { LinkDiscordButton } from "~/components/LinkDiscordButton";
import { usePlayerStore } from "~/stores/usePlayerStore";
import { shortenAddress } from "~/utils/shortenAddress";
import { Badges } from "../Badges";
import { CreatePlayerBanner } from "../CreatePlayerBanner";

export const Profile = () => {
  const player = usePlayerStore((s) => s.player);
  const self = usePlayerStore((s) => s.self);

  if (player === null) {
    return <CreatePlayerBanner />;
  }

  const { avatarId, avatarImageUrl, balance, rank, factionRank } = player;

  const hasAchivements = Boolean(self?.tags?.length);

  return (
    <Flex>
      <BlurBackground
        direction="col"
        lgDirection="row"
        px={5}
        py={5}
        className="space-y-5 lg:space-x-5"
        grow={1}
      >
        <Flex className="relative aspect-square  md:max-w-xs" grow={1}>
          {avatarImageUrl && (
            <Image
              alt={avatarId}
              className="rounded-xl overflow-hidden"
              src={avatarImageUrl}
              fill
            />
          )}

          {!!self?.discordId && (
            <Flex
              p={2}
              className="rounded-br-xl rounded-tl-xl absolute space-x-2 bottom-0 right-0 bg-gray-700"
            >
              <Image
                alt="Discord Link"
                width={24}
                height={24}
                src="/images/social/discord_logo.svg"
              />

              <Text weight="semibold" color="text-white">
                Linked
              </Text>
            </Flex>
          )}
        </Flex>

        <Flex direction="col" className="space-y-3">
          <Text color="text-white" size="2xl" xlSize="4xl">
            {shortenAddress(player?.publicKey || "")}
          </Text>

          <Flex align="center" className="grid grid-cols-2 gap-5" pt={3}>
            <InfoRow color="text-gray-200" title="universal Rank">
              <Text color="text-white">{rank}</Text>
            </InfoRow>
            <InfoRow color="text-gray-200" title="faction rank">
              <Text color="text-white">{factionRank}</Text>
            </InfoRow>
            <InfoRow color="text-gray-200" title="net worth">
              <Price color="text-white" value={balance} />
            </InfoRow>

            {!self?.discordId && <LinkDiscordButton />}
          </Flex>

          {hasAchivements && (
            <Flex direction="col" className="space-y-2">
              <Text weight="semibold" color="text-white" size="lg">
                Achivements
              </Text>

              <Flex>
                <Badges />
              </Flex>
            </Flex>
          )}
        </Flex>
      </BlurBackground>
    </Flex>
  );
};
