import { useWallet } from "@solana/wallet-adapter-react";
import { Text } from "~/components/common/Text";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { View } from "~/views/Dashboard/View";

export const DashboardPage = () => {
  const { wallet, connected } = useWallet();

  if (!wallet || !connected) {
    return (
      <BlurBackground px={3} py={2} justify="center">
        <Text align="center" color="white" size="4xl">
          Start here. Connect your wallet
        </Text>
      </BlurBackground>
    );
  }

  return <View />;
};
