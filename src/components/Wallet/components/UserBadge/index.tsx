import { useWallet } from "@solana/wallet-adapter-react";
import { Wallet } from "@solana/wallet-adapter-wallets";
import React from "react";
import styled from "styled-components";
import { Identicon } from "~/components/Wallet/components/UserBadge/Identicon";
import { shortenAddress } from "~/utils/shortenAddress";

type Props = {
  iconSize?: number;
  showAddress?: boolean;
};

// const BadgeWrapper = styled(Flex)`
//   padding-left: 0.7rem;
//   border-radius: 0.5rem;
//   display: flex;
//   align-items: center;
//   white-space: nowrap;
// `;

// const KeyWrapper = styled(Button)`
//   padding: 0.1rem 0.5rem 0.1rem 0.7rem;
//   margin-left: 0.3rem;
//   border-radius: 0.5rem;
//   display: flex;
//   align-items: center;
// `;

const Icon = styled(Identicon)<Props>`
  width: ${(iconSize) => `${iconSize}`}px;
  border-radius: 50;
`;

export const UserBadge = ({ iconSize, showAddress }: Props) => {
  const { wallet, publicKey, disconnect } = useWallet();

  let name = showAddress ? shortenAddress(`${publicKey}`) : "";

  const unknownWallet = wallet as Wallet;

  if (unknownWallet?.name && !showAddress) {
    name = unknownWallet.name;
  }

  if (!wallet || !publicKey) {
    return null;
  }

  return (
    <Flex className="">
      <button className="bg-white rounded-xl space-x-2 flex px-4 py-2 items-center hover:scale-95">
        <Icon address={publicKey?.toBase58()} iconSize={iconSize} />

        {name && <span className="font-semibold">{name}</span>}
      </button>
      <button onClick={disconnect}>disconnect</button>
    </Flex>
  );
};
