import { Flex } from "~/components/layout/Flex";
import { WalletModal } from "~/components/modals/WalletModal";
import { ConnectButton } from "~/components/Wallet/components/ConnectButton";
import { UserBadge } from "~/components/Wallet/components/UserBadge";

export const Wallet = () => (
  <Flex align="center">
    <ConnectButton allowWalletChange />
    <UserBadge showAddress />
    <WalletModal />
  </Flex>
);
