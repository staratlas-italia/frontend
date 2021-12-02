import { useWallet } from "@solana/wallet-adapter-react";
import { Wallet } from "@solana/wallet-adapter-wallets";
import { Button } from "antd";
import React from "react";
import styled from "styled-components";
import { Flex } from "~/components/layout/Flex";
import { ModalButton } from "~/components/ModalButton";
import { Identicon } from "~/components/Wallet/components/UserBadge/Identicon";
import { shortenAddress } from "~/utils/shortenAddress";

type Props = {
  iconSize?: number;
  showAddress?: boolean;
};

const BadgeWrapper = styled(Flex)`
  padding-left: 0.7rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  white-space: nowrap;
`;

const KeyWrapper = styled(Button)`
  padding: 0.1rem 0.5rem 0.1rem 0.7rem;
  margin-left: 0.3rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
`;

const Icon = styled(Identicon)<{ iconSize: number }>`
  width: ${(iconSize) => iconSize}px;
  border-radius: 50;
`;

export const UserBadge = ({ iconSize, showAddress }: Props) => {
  const { wallet, publicKey, disconnect } = useWallet();

  let name = showAddress ? shortenAddress(`${publicKey}`) : "";

  const unknownWallet = wallet as Wallet;

  if (unknownWallet.name && !showAddress) {
    name = unknownWallet.name;
  }

  if (!wallet || !publicKey) {
    return null;
  }

  return (
    <BadgeWrapper>
      <KeyWrapper>
        <Flex align="center">
          <Icon address={publicKey?.toBase58()} iconSize={iconSize} />
        </Flex>
        {name && (
          <span
            style={{
              marginLeft: "0.5rem",
              fontWeight: 600,
            }}
          >
            {name}
          </span>
        )}
      </KeyWrapper>
      <ModalButton className={""} onClick={disconnect}>
        Disconnect
      </ModalButton>
    </BadgeWrapper>
  );
};
