import { useWallet } from "@solana/wallet-adapter-react";
import React from "react";
import { HowToBuyModal } from "~/components/modals/HowToBuyModal";
import { ConnectButton } from "~/components/Wallet/components/ConnectButton";
import { UserBadge } from "~/components/Wallet/components/UserBadge";

export const Wallet = () => {
  const { connected } = useWallet();
  return (
    <>
      {!connected && <HowToBuyModal />}
      {!connected && <ConnectButton />}
      {connected && <UserBadge showAddress />}
    </>
  );
};
