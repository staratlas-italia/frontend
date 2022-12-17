import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { useCallback } from "react";
import { toast } from "react-toastify";
import {
  DEVNET_TOKEN_SWAP_STATE_ACCOUNTS,
  TOKEN_SWAP_STATE_ACCOUNTS,
} from "~/common/constants";
import { useCluster } from "~/components/ClusterProvider";
import { InfoRow } from "~/components/common/Info";
import { Price } from "~/components/common/Price";
import { Text } from "~/components/common/Text";
import { Button } from "~/components/controls/Button";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Flex } from "~/components/layout/Flex";
import { useTokenBalance } from "~/hooks/useTokenBalance";
import { StateAccount } from "~/pages/admin/View";
import { withdrawProceeds } from "~/programs";

type Props = {
  account: StateAccount;
  loading?: boolean;
  onToggle?: () => void;
};

export const ProgramInstance = ({ account, onToggle, loading }: Props) => {
  const { cluster } = useCluster();
  const anchorWallet = useAnchorWallet();
  const { connection } = useConnection();

  const addressString = account.publicKey.toString();

  const settings = (
    cluster === "devnet"
      ? DEVNET_TOKEN_SWAP_STATE_ACCOUNTS
      : TOKEN_SWAP_STATE_ACCOUNTS
  )[addressString];

  const { balance: proceedsBalance, loading: loadingBalance } = useTokenBalance(
    account.account.proceedsVault
  );

  const handleWithdraw = useCallback(async () => {
    if (!anchorWallet) {
      return;
    }

    try {
      await withdrawProceeds(
        cluster,
        connection,
        anchorWallet,
        account.publicKey
      );

      toast.success("Done.");
    } catch (e) {
      console.log(e);

      toast.error(e.message);
    }
  }, []);

  return (
    <Flex direction="col" key={addressString}>
      <BlurBackground p={3} justify="between">
        <Flex direction="col" className="space-y-3">
          <InfoRow title="Swap">
            <Text color="text-white">
              {settings?.name.toUpperCase() || addressString} /{" "}
              {settings?.vaultCurrency}
            </Text>
          </InfoRow>

          <InfoRow title="Vault">
            <Text color="text-white">{account.account.vault.toString()}</Text>
          </InfoRow>
          <InfoRow title="Proceeds Vault">
            <Text color="text-white">
              {account.account.proceedsVault.toString()}
            </Text>
          </InfoRow>

          <Flex className="space-x-2">
            <InfoRow title="Price">
              <Price
                color="text-white"
                currency="USDC"
                value={account.account.price.toNumber() / Math.pow(10, 6)}
              />
            </InfoRow>
            <InfoRow title="Proceeds vault" loading={loadingBalance}>
              <Price
                color="text-white"
                currency="USDC"
                value={proceedsBalance || 0}
              />
            </InfoRow>
          </Flex>
        </Flex>

        <Flex direction="col">
          <Button loading={loading} onClick={onToggle}>
            <Text color="text-white">
              {account.account.active ? "Disable" : "Enable"}
            </Text>
          </Button>

          <Button loading={loading} onClick={handleWithdraw}>
            <Text color="text-white">Withdraw proceeds</Text>
          </Button>
        </Flex>
      </BlurBackground>
    </Flex>
  );
};
