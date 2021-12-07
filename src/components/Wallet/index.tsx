import { useWallet } from "@solana/wallet-adapter-react";
import React from "react";
import { Flex } from "~/components/layout/Flex";
import { HowToBuyModal } from "~/components/modals/HowToBuyModal";
import { ConnectButton } from "~/components/Wallet/components/ConnectButton";
import { UserBadge } from "~/components/Wallet/components/UserBadge";

export const Wallet = () => {
  const { connected } = useWallet();
  return (
    <Flex align="center">
      {!connected && <HowToBuyModal />}
      <ConnectButton allowWalletChange />
      <UserBadge showAddress />
    </Flex>
  );
};
