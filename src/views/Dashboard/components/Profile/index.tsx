import Image from "next/image";
import { InfoRow } from "~/components/common/Info";
import { Loader } from "~/components/common/Loader";
import { Price } from "~/components/common/Price";
import { Text } from "~/components/common/Text";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Flex } from "~/components/layout/Flex";
import { useModal } from "~/contexts/ModalContext";
import { usePlayer } from "~/hooks/usePlayer";
import { shortenAddress } from "~/utils/shortenAddress";

export const Profile = () => {
  const { player, loading, publicKey } = usePlayer();

  const { open } = useModal("ships-modal");

  if (!player || loading) {
    return (
      <BlurBackground py={5} justify="center" align="center">
        <Loader color="white" />
        <Text size="xl" color="white" weight="medium">
          Searching in the universe...
        </Text>
      </BlurBackground>
    );
  }

  const { avatarId, avatarImageUrl, balance, rank, factionRank } = player;

  return (
    <>
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
      {/* <Flex direction="col">
        <Text color="white" size="4xl" transform="uppercase" weight="semibold">
          Your resources
        </Text>
        <Flex justify="center">
          <Text color="white" size="lg">
            No ships found...{" "}
            <Button onClick={open}>
              <Text color="pink-300" className="underline">
                add a new one
              </Text>
            </Button>
          </Text>
        </Flex>
      </Flex> */}
    </>
  );
};
