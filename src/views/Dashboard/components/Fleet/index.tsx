import { Text } from "~/components/common/Text";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Flex } from "~/components/layout/Flex";
import { usePlayerFleet } from "~/hooks/usePlayerFleet";
import { Card } from "~/views/Dashboard/components/Fleet/components/Card";

export const Fleet = () => {
  const { fleet, loading } = usePlayerFleet();

  if (!fleet?.length || loading) {
    return null;
  }

  return (
    <Flex direction="col" className="z-10 space-y-5">
      <BlurBackground p={5}>
        <Text color="white" size="6xl" weight="bold">
          Your Fleet
        </Text>
      </BlurBackground>
      <Flex
        justify="center"
        direction="col"
        className="grid grid-cols-1 xl:grid-cols-2 gap-3"
      >
        {fleet.map((fleetData) => (
          <Card key={fleetData?.ship?.mint} {...fleetData} />
        ))}
      </Flex>
    </Flex>
  );
};
