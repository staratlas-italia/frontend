import { useWallet } from "@solana/wallet-adapter-react";
import { Text } from "~/components/common/Text";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { SelfRetriever } from "~/components/SelfRetriever";
import { Translation } from "~/i18n/Translation";
import { View } from "../View";

export const Page = () => {
  const { wallet, connected } = useWallet();

  if (!wallet || !connected) {
    return (
      <BlurBackground px={3} py={2} justify="center">
        <Text align="center" color="white" size="4xl">
          <Translation id="Dashboard.Profile.Placeholder.title" />
        </Text>
      </BlurBackground>
    );
  }

  return (
    <SelfRetriever>
      <View />
    </SelfRetriever>
  );
};
