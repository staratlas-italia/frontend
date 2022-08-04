import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import { useCallback, useMemo } from "react";
import { Button } from "~/components/controls/Button";
import { Flex } from "~/components/layout/Flex";
import { List, ListSectons } from "~/components/List";
import { useModal } from "~/contexts/ModalContext";
import { useClearAllStores } from "~/hooks/useClearAllStores";
import { Translation } from "~/i18n/Translation";
import { useTranslation } from "~/i18n/useTranslation";
import { shortenAddress } from "~/utils/shortenAddress";

export const ConnectedContent = () => {
  const { disconnect, publicKey, wallet } = useWallet();

  const { close } = useModal("wallet-modal");
  const clear = useClearAllStores();

  const connectedWalletTranslation = useTranslation(
    "Layout.Wallet.Modal.Connected.title"
  );

  const sections: ListSectons = useMemo(
    () => [
      [
        connectedWalletTranslation,
        [
          {
            bordered: true,
            borderColor: "gray-300",
            title: wallet!.name,
            icon: (props) =>
              wallet?.icon ? (
                <Image src={wallet.icon} width={25} height={25} {...props} />
              ) : null,
            details: shortenAddress(publicKey?.toString() || "", 10),
          },
        ],
      ],
    ],
    [connectedWalletTranslation, publicKey, wallet]
  );

  const onDisconnect = useCallback(() => {
    clear();
    disconnect();
  }, [clear, disconnect]);

  return (
    <Flex p={2} direction="col">
      <Flex
        px={3}
        py={5}
        direction="col"
        className="border-2 border-gray-300 rounded space-y-8"
      >
        <List sections={sections} />
        <Button.Dark
          onClick={() => {
            close();
            setTimeout(() => onDisconnect(), 300);
          }}
        >
          <Translation id="Layout.Wallet.Disconnect.title" />
        </Button.Dark>
      </Flex>
    </Flex>
  );
};
