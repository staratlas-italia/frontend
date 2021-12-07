import { useWallet } from "@solana/wallet-adapter-react";
import React, { useCallback } from "react";
import { WalletModal } from "~/components/modals/WalletModal";
import { useModal } from "~/contexts/ModalContext";

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
  const { wallet, connect, connected } = useWallet();

  const { setVisible } = useModal("wallet-modal");

  const open = useCallback(() => setVisible(true), [setVisible]);

  const handleClick = useCallback(
    () => (wallet ? connect().catch(() => {}) : open()),
    [wallet, connect, open]
  );

  if (!wallet) {
    return (
      <div className="invisible sm:visible">
        <button
          className="px-3 py-2 ring-4 bg-white rounded-lg hover:opacity-90 "
          onClick={handleClick}
        >
          Connect Wallet
        </button>
        <WalletModal />
      </div>
    );
  }

  return null;
};
