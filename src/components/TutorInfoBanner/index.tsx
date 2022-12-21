import { useFeature } from "@growthbook/growthbook-react";
import Link from "next/link";
import { Text } from "~/components/common/Text";
import { Flex } from "~/components/layout/Flex";
import { Translation } from "~/i18n/Translation";
import { getRoute } from "~/utils/getRoute";
import { useCountdown } from "./useCountdown";

export const TutorInfoBanner = () => {
  const isTutorInfoBannerDisabled = useFeature(
    "sai-frontend-enable-tutor-banner"
  ).off;

  const isTutorPurchaseDisabled = useFeature(
    "sai-frontend-enabled-tutor-purchase"
  ).off;

  const [days, hours, minutes, seconds] = useCountdown(
    "2022-12-23T00:00:00.000Z"
  );

  if (isTutorInfoBannerDisabled) {
    return null;
  }

  return (
    <Flex justify="center" pb={5}>
      <Flex
        align="center"
        className="bg-white rounded-lg w-full xl:max-w-2xl space-x-2"
        direction="col"
        px={5}
        py={3}
        justify="between"
        mdDirection="row"
      >
        <Flex direction="col">
          <Text weight="semibold">
            <Translation
              id={
                isTutorPurchaseDisabled
                  ? "tutor.banner.pre.title"
                  : "tutor.banner.title"
              }
            />
          </Text>
          <Text>
            {isTutorPurchaseDisabled ? (
              <Translation
                id="citizenship.banner.pre.subtitle"
                values={{
                  countdown: `${days}d ${hours}h ${minutes}m ${seconds}s`,
                }}
              />
            ) : (
              <Translation id="tutor.banner.subtitle" />
            )}
          </Text>
        </Flex>

        {!isTutorPurchaseDisabled && (
          <Link
            href={getRoute("/tutor")}
            className="underline cursor-pointer text-right"
          >
            <Translation id="citizenship.banner.action.title" />
          </Link>
        )}
      </Flex>
    </Flex>
  );
};
