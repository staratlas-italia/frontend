import { useWallet } from "@solana/wallet-adapter-react";
import { getPhantomWallet } from "@solana/wallet-adapter-wallets";
import React, { useCallback, useMemo } from "react";
import { Button } from "~/components/controls/Button";
import { useModal } from "../../../contexts/ModalContext";
import { BaseModal } from "../BaseModal";

export const WalletModal = () => {
  const { select } = useWallet();

  const { setVisible } = useModal("wallet-modal");

  const close = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const phatomWallet = useMemo(() => getPhantomWallet(), []);

  return (
    <BaseModal id="wallet-modal">
      <span
        style={{
          color: "rgba(255, 255, 255, 0.75)",
          fontSize: "14px",
          lineHeight: "14px",
          fontFamily: "GraphikWeb",
          letterSpacing: "0.02em",
          marginBottom: 14,
        }}
      >
        RECOMMENDED
      </span>

      <Button
        className="phantom-button metaplex-button"
        onClick={() => {
          console.log(phatomWallet.name);
          select(phatomWallet.name);
          close();
        }}
      >
        Connect to Phantom
      </Button>
    </BaseModal>
  );
};
