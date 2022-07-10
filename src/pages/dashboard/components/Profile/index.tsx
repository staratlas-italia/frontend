import { useFeature } from "@growthbook/growthbook-react";
import { Profile as ProfileControl } from "./control";
import { Profile as ProfileVariant } from "./variant";

export const Profile = () => {
  const isReferralSystemDisabled = useFeature(
    "sai-frontend-enabled-referral-system"
  ).on;

  if (isReferralSystemDisabled) {
    return <ProfileVariant />;
  }

  return <ProfileControl />;
};
