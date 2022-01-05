import { useWallet } from "@solana/wallet-adapter-react";
import React from "react";
import { ConnectedContent } from "~/components/modals/WalletModal/components/ConnectedContent";
import { DisconnectedContent } from "~/components/modals/WalletModal/components/DisconnectedContent";
import { BaseModal } from "../BaseModal";

export const WalletModal = () => {
  const { connected } = useWallet();

  return (
    <BaseModal id="wallet-modal">
      {connected ? <ConnectedContent /> : <DisconnectedContent />}
    </BaseModal>
  );
};
