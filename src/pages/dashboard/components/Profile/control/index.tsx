import { useWallet } from "@solana/wallet-adapter-react";
import classNames from "classnames";
import Image from "next/image";
import { Fragment, useMemo } from "react";
import { InfoRow } from "~/components/common/Info";
import { Price } from "~/components/common/Price";
import { Text } from "~/components/common/Text";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Flex } from "~/components/layout/Flex";
import { DiscordLink } from "~/components/LinkDiscordButton";
import { useSelf } from "~/hooks/useNullableSelf";
import { usePlayerStore } from "~/stores/usePlayerStore";
import { shortenAddress } from "~/utils/shortenAddress";
import { Badges } from "../Badges";
import { CreatePlayerBanner } from "../CreatePlayerBanner";

export const Profile = () => {
  const self = useSelf();
  const player = usePlayerStore((s) => s.player);

  const { publicKey } = useWallet();

  const hasAchivements = Boolean(self.tags?.length);

  const Wrapper = useMemo(
    () => (self.discordId ? Fragment : DiscordLink),
    [self.discordId]
  );

  const { avatarId, avatarImageUrl, balance, rank, factionRank } = player || {};

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
          {avatarImageUrl ? (
            <Image
              alt={avatarId || "star atlas avatar"}
              className="rounded-xl overflow-hidden"
              src={avatarImageUrl}
              fill
            />
          ) : (
            <CreatePlayerBanner />
          )}

          <Wrapper>
            <Flex
              p={3}
              className={classNames(
                {
                  "bg-green-600": self.discordId,
                  "bg-red-700": !self.discordId,
                },
                "rounded-br-xl rounded-tl-xl absolute space-x-2 bottom-0 right-0"
              )}
            >
              <Image
                alt="Discord Link"
                width={24}
                height={24}
                src="/images/social/discord_logo.svg"
              />

              <Text weight="semibold" color="text-white">
                {self?.discordId ? "Linked" : "Link to discord"}
              </Text>
            </Flex>
          </Wrapper>
        </Flex>

        <Flex direction="col" className="space-y-3">
          <Text color="text-white" size="2xl" xlSize="4xl">
            {shortenAddress(publicKey?.toString() || "")}
          </Text>

          <Flex align="center" className="grid grid-cols-2 gap-5" pt={3}>
            <InfoRow color="text-gray-200" title="universal Rank">
              <Text color="text-white">{rank || "-"}</Text>
            </InfoRow>
            <InfoRow color="text-gray-200" title="faction rank">
              <Text color="text-white">{factionRank || "-"}</Text>
            </InfoRow>
            <InfoRow color="text-gray-200" title="net worth">
              <Price color="text-white" value={balance} />
            </InfoRow>
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
