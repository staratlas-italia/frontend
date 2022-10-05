import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback } from "react";
import { Button } from "~/components/controls/Button";
import { useModal } from "~/contexts/ModalContext";
import { Translation } from "~/i18n/Translation";

export const ConnectButton = () => {
  const { open } = useModal("wallet-modal");
  const { wallet, connect, connected } = useWallet();

  const handleClick = useCallback(() => {
    wallet ? connect().catch(() => {}) : open();
  }, [wallet, connect, open]);

  if (!wallet || !connected) {
    return (
      <div>
        <Button.Neutral size="small" onClick={handleClick}>
          <Translation id="Layout.Wallet.Connect.title" />
        </Button.Neutral>
      </div>
    );
  }

  return null;
};
