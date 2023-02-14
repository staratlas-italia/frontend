import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import { Button } from "~/components/controls/Button";
import { Flex } from "~/components/layout/Flex";
import { useModal } from "~/contexts/ModalContext";
import { Translation } from "~/i18n/Translation";

export const DisconnectedContent = () => {
  const { close } = useModal("wallet-modal");
  const { select, wallets } = useWallet();

  return (
    <Flex direction="col" className="space-y-3" p={3}>
      {wallets.map((wallet) => (
        <Button
          kind="dark"
          key={wallet.adapter.name}
          iconLeft={({ className }) => (
            <Image
              alt="Wallet icon"
              src={wallet.adapter.icon}
              width={30}
              height={30}
              className={className}
            />
          )}
          onClick={() => {
            close();
            setTimeout(() => select(wallet.adapter.name), 300);
          }}
        >
          <Translation
            id="Layout.Wallet.Modal.ConnectedTo.title"
            values={{ wallet: wallet.adapter.name }}
          />
        </Button>
      ))}
    </Flex>
  );
};
