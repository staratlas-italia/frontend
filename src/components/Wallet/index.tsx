import { Flex } from "~/components/layout/Flex";
import { WalletModal } from "~/components/modals/WalletModal";
import { ConnectButton } from "~/components/Wallet/components/ConnectButton";
import { UserBadge } from "~/components/Wallet/components/UserBadge";

type Props = {
  hideSettings?: boolean;
};

export const Wallet = ({ hideSettings }: Props) => (
  <Flex align="center">
    <ConnectButton />
    <UserBadge showAddress disableSettings={hideSettings} />
    <WalletModal />
  </Flex>
);
