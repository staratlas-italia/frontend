import Link from "next/link";
import { Heading } from "~/components/common/Heading";
import { Text } from "~/components/common/Text";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Flex } from "~/components/layout/Flex";
import { useNullableBadges } from "~/hooks/useNullableBadges";

export const Badges = () => {
  const { badges } = useNullableBadges();

  if (!badges || !badges?.length) {
    return null;
  }

  return (
    <>
      <Flex direction="col" className="z-10 space-y-5">
        <Heading title="Badges.Heading.title" />

        <Flex className="space-x-3 overflow-scroll">
          {badges.map(([badge, metadata]) => (
            <BlurBackground
              key={badge.mintAddress.toString()}
              disableRound
              direction="col"
              className=" rounded-lg max"
              p={1}
              shrink={1}
            >
              <Flex
                key={badge.mintAddress.toString()}
                className="w-44 h-44 rounded-lg overflow-hidden"
              >
                <img src={metadata?.image} />
              </Flex>
              <Flex justify="center" shrink={1} py={2} px={1}>
                <Link
                  href={`https://solscan.io/account/${badge.mintAddress.toString()}`}
                >
                  <a target="_blank">
                    <Text align="center" color="white" decoration="underline">
                      {badge.name}
                    </Text>
                  </a>
                </Link>
              </Flex>
            </BlurBackground>
          ))}
        </Flex>
      </Flex>
    </>
  );
};
