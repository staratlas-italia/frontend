import { useWallet } from "@solana/wallet-adapter-react";
import { Button, Dropdown, Menu } from "antd";
import { ButtonProps } from "antd/lib/button";
import React, { useCallback } from "react";
import { WalletModal } from "~/components/modals/WalletModal";
import { useModal } from "~/contexts/ModalContext";

export type ConnectButtonProps = ButtonProps &
  React.RefAttributes<HTMLElement> & {
    allowWalletChange?: boolean;
    className?: string;
  };

export const ConnectButton = ({
  allowWalletChange,
  className,
  children,
  disabled,
  onClick,
  ...rest
}: ConnectButtonProps) => {
  const { wallet, connect, connected } = useWallet();

  const { setVisible } = useModal("wallet-modal");

  const open = useCallback(() => setVisible(true), [setVisible]);

  const handleClick = useCallback(
    () => (wallet ? connect().catch(() => {}) : open()),
    [wallet, connect, open]
  );

  if (!wallet || !allowWalletChange) {
    return (
      <>
        <Button
          shape="round"
          className={className || "connector"}
          {...rest}
          onClick={(e) => {
            onClick?.(e);
            handleClick();
          }}
          disabled={connected && disabled}
        >
          {connected ? children : "Connect Wallet"}
        </Button>
        <WalletModal />
      </>
    );
  }

  return (
    <Dropdown.Button
      className={className || (connected ? "connector" : "")}
      onClick={handleClick}
      disabled={connected && disabled}
      overlay={
        <Menu className={"black-dropdown"}>
          <Menu.Item onClick={open}>Change Wallet</Menu.Item>
        </Menu>
      }
    >
      Connect
    </Dropdown.Button>
  );
};
