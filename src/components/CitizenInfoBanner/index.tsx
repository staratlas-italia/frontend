import { useFeature } from "@growthbook/growthbook-react";
import Link from "next/link";
import { Text } from "~/components/common/Text";
import { Flex } from "~/components/layout/Flex";
import { Translation } from "~/i18n/Translation";
import { getRoute } from "~/utils/getRoute";
import { useCountdown } from "./useCountdown";

export const CitizenInfoBanner = () => {
  const isCitizenInfoBannerDisabled = useFeature(
    "sai-frontend-enable-mint-banner"
  ).off;

  const isCitizenshipPurchaseDisabled = useFeature(
    "sai-frontend-enabled-citizenship-purchase"
  ).off;

  const [days, hours, minutes, seconds] = useCountdown(
    "2022-10-07T20:00:00.000Z"
  );

  if (isCitizenInfoBannerDisabled) {
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
                isCitizenshipPurchaseDisabled
                  ? "citizenship.banner.pre.title"
                  : "citizenship.banner.title"
              }
            />
          </Text>
          <Text>
            {isCitizenshipPurchaseDisabled ? (
              <Translation
                id="citizenship.banner.pre.subtitle"
                values={{
                  countdown: `${days}d ${hours}h ${minutes}m ${seconds}s`,
                }}
              />
            ) : (
              <Translation id="citizenship.banner.subtitle" />
            )}
          </Text>
        </Flex>

        {!isCitizenshipPurchaseDisabled && (
          <Link href={getRoute("/citizenship")}>
            <a className="underline cursor-pointer text-right">
              <Translation id="citizenship.banner.action.title" />
            </a>
          </Link>
        )}
      </Flex>
    </Flex>
  );
};
