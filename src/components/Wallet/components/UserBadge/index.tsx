import { useWallet } from "@solana/wallet-adapter-react";
import { Wallet } from "@solana/wallet-adapter-wallets";
import React from "react";
import styled from "styled-components";
import { Text } from "~/components/common/Text";
import { Button } from "~/components/controls/Button";
import { Flex } from "~/components/layout/Flex";
import { Identicon } from "~/components/Wallet/components/UserBadge/Identicon";
import { Settings } from "~/components/Wallet/components/UserBadge/Settings";
import { shortenAddress } from "~/utils/shortenAddress";

type Props = {
  iconSize?: number;
  showAddress?: boolean;
};

const Icon = styled(Identicon)<Props>`
  width: ${(iconSize) => `${iconSize}`}px;
  border-radius: 50;
`;

export const UserBadge = ({ iconSize, showAddress }: Props) => {
  const { connected, wallet, publicKey } = useWallet();

  let name = showAddress ? shortenAddress(`${publicKey}`) : "";

  const unknownWallet = wallet as Wallet;

  if (unknownWallet?.name && !showAddress) {
    name = unknownWallet.name;
  }

  if (!wallet || !connected || !publicKey) {
    return null;
  }

  return (
    <Flex className="space-x-3">
      <Settings />
      <Button
        size={"small"}
        className="rounded-xl"
        bgColor="white"
        hoverBgColor="gray-100"
      >
        <Flex className="space-x-2" align="center">
          <Icon address={publicKey?.toBase58()} iconSize={iconSize} />

          {name && <Text weight="semibold">{name}</Text>}
        </Flex>
      </Button>
    </Flex>
  );
};
