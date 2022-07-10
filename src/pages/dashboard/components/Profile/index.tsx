import { InfoRow } from "~/components/common/Info";
import { Price } from "~/components/common/Price";
import { Text } from "~/components/common/Text";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Flex } from "~/components/layout/Flex";
import { usePlayerStore } from "~/stores/usePlayerStore";
import { shortenAddress } from "~/utils/shortenAddress";
import { Referral } from "./Referral";

export const Profile = () => {
  const player = usePlayerStore((s) => s.player);

  if (player === null) {
    return null;
  }

  const { avatarId, avatarImageUrl, balance, rank, factionRank } = player;

  return (
    <Flex
      className="xl:space-x-5 space-y-5 xl:space-y-0"
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

      <Referral />
    </Flex>
  );
};
