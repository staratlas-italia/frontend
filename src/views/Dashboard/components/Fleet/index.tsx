import { Text } from "~/components/common/Text";
import { EmptyView } from "~/components/EmptyView";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Flex } from "~/components/layout/Flex";
import { LoadingView } from "~/components/LoadingView";
import { usePlayerStore } from "~/stores/usePlayerStore";
import { Card } from "~/views/Dashboard/components/Fleet/components/Card";

export const Fleet = () => {
  const fleet = usePlayerStore((s) => s.fleet);

  return (
    <Flex direction="col" className="z-10 space-y-5">
      <BlurBackground p={5}>
        <Text color="white" size="6xl" weight="bold">
          Your Fleet
        </Text>
      </BlurBackground>
      {fleet === null ? (
        <LoadingView />
      ) : !fleet?.length ? (
        <EmptyView
          image="/images/icons/rocket-solid.svg"
          title="No ships found"
        />
      ) : (
        <>
          <Flex
            justify="center"
            direction="col"
            className="grid grid-cols-1 xl:grid-cols-2 gap-3"
          >
            {fleet.map((fleetData) => (
              <Card key={fleetData?.ship?.mint} {...fleetData} />
            ))}
          </Flex>
        </>
      )}
    </Flex>
  );
};
