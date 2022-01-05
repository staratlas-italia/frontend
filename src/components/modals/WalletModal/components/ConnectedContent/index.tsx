import { useWallet } from "@solana/wallet-adapter-react";
import { Text } from "~/components/common/Text";
import { Button } from "~/components/controls/Button";
import { Flex } from "~/components/layout/Flex";
import { useModal } from "~/contexts/ModalContext";
import { Translation } from "~/i18n/Translation";
import { shortenAddress } from "~/utils/shortenAddress";

export const ConnectedContent = () => {
  const { disconnect, publicKey } = useWallet();

  const { close } = useModal("wallet-modal");

  return (
    <Flex p={3} direction="col" className="space-y-3">
      <Text weight="semibold" size="3xl">
        {shortenAddress(publicKey?.toString() || "")}
      </Text>
      <Button
        bgColor="gray-800"
        hoverBgColor="gray-900"
        textColor="white"
        onClick={() => {
          close();
          setTimeout(() => disconnect(), 300);
        }}
      >
        <Translation id="Layout.Wallet.Disconnect.title" />
      </Button>
    </Flex>
  );
};
