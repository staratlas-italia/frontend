import Link from "next/link";
import { Heading } from "~/components/common/Heading";
import { Text } from "~/components/common/Text";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Flex } from "~/components/layout/Flex";
import { usePlayerStore } from "~/stores/usePlayerStore";

export const Badges = () => {
  const badges = usePlayerStore((s) => s.badges);

  if (!badges.length) {
    return null;
  }

  return (
    <>
      <Flex direction="col" className="z-10 space-y-5">
        <Heading title="Badges.Heading.title" />

        <Flex className="space-x-3 overflow-scroll">
          {badges.map((badge) => (
            <BlurBackground
              key={badge.mint.toString()}
              disableRound
              direction="col"
              className=" rounded-lg max"
              p={1}
              shrink={1}
            >
              <Flex
                key={badge.mint.toString()}
                className="w-44 h-44 rounded-lg overflow-hidden"
              >
                <img src={badge.metadataExternal?.image} />
              </Flex>
              <Flex justify="center" shrink={1} py={2} px={1}>
                <Link
                  href={`https://solscan.io/account/${badge.mint.toString()}`}
                >
                  <a target="_blank">
                    <Text align="center" color="white" decoration="underline">
                      {badge.metadataExternal?.name}
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
