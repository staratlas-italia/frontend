import { DISCORD_OAUTH_URL } from "~/common/constants";
import { InfoRow } from "~/components/common/Info";
import { Price } from "~/components/common/Price";
import { Text } from "~/components/common/Text";
import { Button } from "~/components/controls/Button";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Flex } from "~/components/layout/Flex";
import { usePlayerStore } from "~/stores/usePlayerStore";
import { shortenAddress } from "~/utils/shortenAddress";
import { CreatePlayerBanner } from "../CreatePlayerBanner";
import Image from "next/image";
import Link from "next/link";

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

          {self && !self.discordId && (
            <InfoRow>
              <Link href={DISCORD_OAUTH_URL}>
                <a>
                  <Button.Primary
                    size="small"
                    iconRight={({ className }) => (
                      <Image
                        src={"/images/social/discord_logo.svg"}
                        width={50}
                        height={50}
                        className={className}
                      />
                    )}
                  >
                    Link
                  </Button.Primary>
                </a>
              </Link>
            </InfoRow>
          )}
        </Flex>
      </BlurBackground>
    </Flex>
  );
};
