import { useFeature } from "@growthbook/growthbook-react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/router";
import { AssertAuthenticated } from "~/components/auth/AssertAuthenticated";
import { Redirect } from "~/components/common/Redirect";
import { Text } from "~/components/common/Text";
import { Button } from "~/components/controls/Button";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { useReferral } from "~/hooks/useReferral";
import { Translation } from "~/i18n/Translation";
import { getRoute } from "~/utils/getRoute";

const ReferralCodePage = () => {
  const isReferralSystemDisabled = useFeature(
    "sai-frontend-enabled-referral-system"
  ).off;

  const { code } = useRouter().query;
  const { wallet, connected } = useWallet();

  const { redeem, redeemingUser } = useReferral();

  if (isReferralSystemDisabled) {
    return <Redirect to={getRoute("/dashboard")} />;
  }

  if (!wallet || !connected) {
    return (
      <BlurBackground px={3} py={2} justify="center">
        <Text align="center" color="text-white" size="4xl">
          <Translation id="Dashboard.Profile.Placeholder.title" />
        </Text>
      </BlurBackground>
    );
  }

  if (!redeemingUser) {
    return (
      <AssertAuthenticated>
        <BlurBackground>
          <Button
            textColor="text-white"
            onClick={() => (code ? redeem(code as string) : null)}
          >
            Redeem
          </Button>
        </BlurBackground>
      </AssertAuthenticated>
    );
  }

  return <Redirect to={getRoute("/dashboard")} />;
};

export default ReferralCodePage;
