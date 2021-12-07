import { useWallet } from "@solana/wallet-adapter-react";
import { getPhantomWallet } from "@solana/wallet-adapter-wallets";
import React, { useCallback, useMemo, useState } from "react";
import { Button } from "~/components/controls/Button";
import { useModal } from "../../../contexts/ModalContext";
import { BaseModal } from "../BaseModal";

export const WalletModal = () => {
  const { wallets, wallet: selected, select } = useWallet();

  const { setVisible } = useModal("wallet-modal");

  const [showWallets, setShowWallets] = useState(false);

  const close = useCallback(() => {
    setVisible(false);
    setShowWallets(false);
  }, [setVisible, setShowWallets]);

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
        <img src={phatomWallet?.icon} style={{ width: "1.2rem" }} />
        &nbsp;Connect to Phantom
      </Button>
      {/* <Collapse
        ghost
        expandIcon={(panelProps) =>
          panelProps.isActive ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 7.5L10 12.5L5 7.5"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 5L12.5 10L7.5 15"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          )
        }
      >
        <Collapse.Panel
          header={
            <span
              style={{
                fontWeight: 600,
                fontSize: "16px",
                lineHeight: "16px",
                letterSpacing: "-0.01em",
                color: "rgba(255, 255, 255, 255)",
              }}
            >
              Other Wallets
            </span>
          }
          key="1"
        >
          {wallets.map((wallet, idx) => {
            if (wallet.name === "Phantom") return null;

            return (
              <Button
                key={idx}
                className="metaplex-button w-100"
                style={{
                  marginBottom: 5,
                }}
                onClick={() => {
                  select(wallet.name);
                  close();
                }}
              >
                Connect to {wallet.name}
              </Button>
            );
          })}
        </Collapse.Panel>
      </Collapse> */}
    </BaseModal>
  );
};
