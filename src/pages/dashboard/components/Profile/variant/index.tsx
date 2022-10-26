import { InfoRow } from "~/components/common/Info";
import { Price } from "~/components/common/Price";
import { Text } from "~/components/common/Text";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Flex } from "~/components/layout/Flex";
import { LinkDiscordButton } from "~/components/LinkDiscordButton";
import { usePlayerStore } from "~/stores/usePlayerStore";
import { shortenAddress } from "~/utils/shortenAddress";
import { CreatePlayerBanner } from "../CreatePlayerBanner";
import { Referral } from "./Referral";

export const Profile = () => {
  const player = usePlayerStore((s) => s.player);
  const self = usePlayerStore((state) => state.self);

  if (player === null) {
    return <CreatePlayerBanner />;
  }

  const { avatarId, avatarImageUrl, balance, rank, factionRank } = player;

  return (
    <Flex
      className="xl:space-x-5 space-y-5  xl:space-y-0"
      direction="col"
      xlDirection="row"
    >
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
          align="center"
          className="w-full lg:w-64 "
        >
          {avatarImageUrl && (
            <img
              className="rounded-xl overflow-hidden w-full lg:w-64 lg:h-64  max-w-sm"
              src={avatarImageUrl}
              alt={avatarId}
            />
          )}
        </Flex>
        <Flex direction="col">
          <Flex align="center">
            <InfoRow color="text-gray-200" title="addr">
              <Text color="text-white" size="4xl">
                {shortenAddress(player?.publicKey || "")}
              </Text>
            </InfoRow>
          </Flex>
          <Flex align="center" pt={5} className="grid grid-cols-2 gap-5">
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
        </Flex>
      </BlurBackground>

      <Referral />
    </Flex>
  );
};
