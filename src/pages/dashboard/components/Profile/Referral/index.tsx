import { useFeature } from "@growthbook/growthbook-react";
import { Text } from "~/components/common/Text";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Flex } from "~/components/layout/Flex";
import { Code } from "./Code";

export const Referral = () => {
  const isReferralSystemDisabled = useFeature(
    "sai-frontend-enabled-referral-system"
  ).off;

  if (isReferralSystemDisabled) {
    return null;
  }

  return (
    <Flex>
      <BlurBackground p={5} className="max-w-xs">
        <Flex direction="col" className="space-y-5 overflow-auto">
          <Text color="white" size="2xl" transform="uppercase">
            Reclutamento
          </Text>

          <Code />

          <Text color="white" size="xs">
            Condividi questo link con i tuoi amici per ottenere delle
            ricomponese
          </Text>

          <Flex justify="between">
            <Flex direction="col" justify="center" className="w-full">
              <Text align="center" color="white" size="sm">
                Reclute
              </Text>
              <Text align="center" color="white" size="3xl">
                10
              </Text>
            </Flex>

            <Flex className="w-1 bg-white" />

            <Flex direction="col" justify="center" className="w-full">
              <Text align="center" color="white" size="sm">
                Cittadini
              </Text>
              <Text align="center" color="white" size="3xl">
                2
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </BlurBackground>
    </Flex>
  );
};
