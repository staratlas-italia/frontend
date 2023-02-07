import { CogIcon } from "@heroicons/react/outline";
import { useWallet } from "@solana/wallet-adapter-react";
import { Wallet } from "@solana/wallet-adapter-wallets";
import styled from "styled-components";
import { Text } from "~/components/common/Text";
import { Button } from "~/components/controls/Button";
import { Flex } from "~/components/layout/Flex";
import { Identicon } from "~/components/Wallet/components/UserBadge/Identicon";
import { useModal } from "~/contexts/ModalContext";
import { shortenAddress } from "~/utils/shortenAddress";

type Props = {
  iconSize?: number;
  showAddress?: boolean;
  disableSettings?: boolean;
};

const Icon = styled(Identicon)<Props>`
  width: ${(iconSize) => `${iconSize}`}px;
  border-radius: 50;
`;

export const UserBadge = ({
  disableSettings,
  iconSize,
  showAddress,
}: Props) => {
  const { connected, wallet, publicKey } = useWallet();
  const { open } = useModal("wallet-modal");

  let name = showAddress ? shortenAddress(`${publicKey}`) : "";

  const unknownWallet = wallet as Wallet;

  if (unknownWallet?.name && !showAddress) {
    name = unknownWallet.name;
  }

  if (!wallet || !connected || !publicKey) {
    return null;
  }

  return (
    <Flex className="space-x-2">
      <Button
        kind="neutral"
        size="small"
        iconRight={disableSettings ? undefined : CogIcon}
        onClick={disableSettings ? undefined : open}
      >
        <Flex className="space-x-2 h-7" align="center">
          <Icon address={publicKey?.toBase58()} iconSize={iconSize} />

          {name && (
            <Text weight="bold" className="text-xs lg:text-base">
              {name}
            </Text>
          )}
        </Flex>
      </Button>
    </Flex>
  );
};
