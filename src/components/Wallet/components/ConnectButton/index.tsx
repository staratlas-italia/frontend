import { useWallet } from "@solana/wallet-adapter-react";
import React, { useCallback } from "react";
import { Button } from "~/components/controls/Button";
import { useModal } from "~/contexts/ModalContext";
import { Translation } from "~/i18n/Translation";

export type ConnectButtonProps = React.RefAttributes<HTMLElement> & {
  onClick?: () => void;
  allowWalletChange?: boolean;
  className?: string;
};

export const ConnectButton = ({
  allowWalletChange,
  className,
  onClick,
  ...rest
}: ConnectButtonProps) => {
  const { open } = useModal("wallet-modal");
  const { wallet, connect, connected } = useWallet();

  const handleClick = useCallback(
    () => (wallet ? connect().catch(() => {}) : open()),
    [wallet, connect, open]
  );

  if (!wallet || !connected) {
    return (
      <div>
        <Button
          size={"small"}
          className="rounded-xl"
          bgColor="white"
          hoverBgColor="gray-100"
          onClick={handleClick}
        >
          <Translation id="Layout.Wallet.Connect.title" />
        </Button>
      </div>
    );
  }

  return null;
};
