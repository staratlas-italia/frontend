import { useIntl } from "react-intl";
import { Text } from "~/components/common/Text";
import type { TextColor } from "~/components/common/Text/types";
import { Countdown } from "~/components/Countdown";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Flex } from "~/components/layout/Flex";
import { Progress } from "~/components/Progress";
import { NormalizedShipStakingInfoExtended, StarAtlasEntity } from "~/types";
import { Heading } from "./components/Heading";
import { Image } from "./components/Image";

type Props = {
  ship?: StarAtlasEntity;
  stakeInfo?: NormalizedShipStakingInfoExtended;
};

const shipColors: Record<string, TextColor> = {
  "xx-small": "text-white",
  "x-small": "text-indigo-300",
  small: "text-yellow-500",
  medium: "text-emerald-500",
  large: "text-pink-600",
  capital: "text-purple-400",
  commander: "text-red-600",
};

export const Card = ({ ship, stakeInfo }: Props) => {
  const intl = useIntl();

  if (!ship) {
    return null;
  }

  return (
    <BlurBackground
      direction="col"
      className="overflow-hidden block flex-0 relative"
    >
      <Image src={ship?.image} alt={ship?.name} />

      <div className="relative pb-8 sm:pb-16 md:pb-10 lg:w-full">
        <main className="relative z-10 pt-5 mx-auto w-full px-4 sm:pt-12 sm:px-6 md:pt-10 lg:px-8">
          <div className="sm:text-center lg:text-left">
            <Heading
              color={shipColors[ship?.attributes?.class?.toLowerCase()]}
              title={ship?.name}
              subtitle={ship?.attributes?.class}
            />
            <div className="mt-3 sm:mt-5 sm:mx-auto md:mt-5 lg:mx-0">
              <Flex direction="row" className="w-full">
                <Flex justify="start" align="center">
                  <img
                    src={`/images/icons/rocket-solid.svg`}
                    className="h-5 w-5 text-white"
                  />
                  <Text
                    color="text-white"
                    weight="semibold"
                    size="xl"
                    className="ml-2"
                  >
                    {stakeInfo?.shipQuantityInEscrow}
                  </Text>
                </Flex>
              </Flex>
              <Flex py={3} direction="col" className="space-y-4">
                <Progress
                  title={
                    <>
                      {"health"} -{" "}
                      <Countdown
                        date={
                          Date.now() +
                          Math.floor(
                            (stakeInfo?.millisecondsToBurnOneToolkit || 0) *
                              ((stakeInfo?.toolkitMaxReserve || 0) -
                                (new Date().getTime() -
                                  (stakeInfo?.repairedAtTimestamp || 0) *
                                    1000) /
                                  (stakeInfo?.millisecondsToBurnOneToolkit ||
                                    1))
                          )
                        }
                      />
                    </>
                  }
                  max={stakeInfo?.toolkitMaxReserve || 1}
                  level={
                    (stakeInfo?.toolkitMaxReserve || 0) -
                    (new Date().getTime() -
                      (stakeInfo?.repairedAtTimestamp || 0) * 1000) /
                      (stakeInfo?.millisecondsToBurnOneToolkit || 1)
                  }
                />
                <Progress
                  title={
                    <>
                      {"fuel"} -{" "}
                      <Countdown
                        date={
                          Date.now() +
                          Math.floor(
                            (stakeInfo?.millisecondsToBurnOneFuel || 0) *
                              ((stakeInfo?.fuelMaxReserve || 0) -
                                (new Date().getTime() -
                                  (stakeInfo?.repairedAtTimestamp || 0) *
                                    1000) /
                                  (stakeInfo?.millisecondsToBurnOneFuel || 1))
                          )
                        }
                      />
                    </>
                  }
                  max={stakeInfo?.fuelMaxReserve || 1}
                  level={
                    (stakeInfo?.fuelMaxReserve || 0) -
                    (new Date().getTime() -
                      (stakeInfo?.fueledAtTimestamp || 0) * 1000) /
                      (stakeInfo?.millisecondsToBurnOneFuel || 1)
                  }
                />
                <Progress
                  title={
                    <>
                      {"food"} -{" "}
                      <Countdown
                        date={
                          Date.now() +
                          Math.floor(
                            (stakeInfo?.millisecondsToBurnOneFood || 0) *
                              ((stakeInfo?.foodMaxReserve || 0) -
                                (new Date().getTime() -
                                  (stakeInfo?.repairedAtTimestamp || 0) *
                                    1000) /
                                  (stakeInfo?.millisecondsToBurnOneFood || 1))
                          )
                        }
                      />
                    </>
                  }
                  max={stakeInfo?.foodMaxReserve || 1}
                  level={
                    (stakeInfo?.foodMaxReserve || 0) -
                    (new Date().getTime() -
                      (stakeInfo?.fedAtTimestamp || 0) * 1000) /
                      (stakeInfo?.millisecondsToBurnOneFood || 1)
                  }
                />
                <Progress
                  title={
                    <>
                      {"ammo"} -{" "}
                      <Countdown
                        date={
                          Date.now() +
                          Math.floor(
                            (stakeInfo?.millisecondsToBurnOneArms || 0) *
                              ((stakeInfo?.armsMaxReserve || 0) -
                                (new Date().getTime() -
                                  (stakeInfo?.repairedAtTimestamp || 0) *
                                    1000) /
                                  (stakeInfo?.millisecondsToBurnOneArms || 1))
                          )
                        }
                      />
                    </>
                  }
                  max={stakeInfo?.armsMaxReserve || 1}
                  level={
                    (stakeInfo?.armsMaxReserve || 0) -
                    (new Date().getTime() -
                      (stakeInfo?.armedAtTimestamp || 0) * 1000) /
                      (stakeInfo?.millisecondsToBurnOneArms || 1)
                  }
                />
              </Flex>
            </div>
          </div>
        </main>
      </div>
    </BlurBackground>
  );
};
