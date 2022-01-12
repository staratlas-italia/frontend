import { Text } from "~/components/common/Text";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Flex } from "~/components/layout/Flex";
import { usePlayerFleet } from "~/hooks/usePlayerFleet";
import { ShipCard } from "~/views/Ships/components/Ship";

export const Fleet = () => {
  const { fleet, loading } = usePlayerFleet();

  if (!fleet?.length || loading) {
    return null;
  }

  return (
    <Flex direction="col" className="z-10 space-y-3">
      <BlurBackground p={5}>
        <Text color="white" size="4xl" transform="uppercase" weight="semibold">
          Your Fleet
        </Text>
      </BlurBackground>
      <Flex justify="center" direction="col" className="space-y-5">
        {fleet.map(({ ship }) => (ship ? <ShipCard ship={ship} /> : null))}
      </Flex>
    </Flex>
  );
};
