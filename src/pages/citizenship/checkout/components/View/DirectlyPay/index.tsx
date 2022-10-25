import { createTransfer } from "@solana/pay";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useWallet } from "@solana/wallet-adapter-react";
import { Cluster, Connection, PublicKey } from "@solana/web3.js";
import BigNumber from "bignumber.js";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import {
  DEVNET_USDC_TOKEN_MINT,
  SAI_CITIZEN_WALLET_DESTINATION,
  USDC_TOKEN_MINT,
} from "~/common/constants";
import { Button } from "~/components/controls/Button";
import { SelfRetriever } from "~/components/SelfRetriever";
import { useSelf } from "~/hooks/useNullableSelf";
import { getSftPrice, getDiscoutAmount } from "~/hooks/useSftPrice";
import { Translation } from "~/i18n/Translation";
import { usePaymentStore } from "~/stores/usePaymentStore";
import { getConnectionClusterUrl } from "~/utils/connection";
import { ReferenceRetriever } from "../../ReferenceRetriever";
import { usePaymentReference } from "../usePaymentReference";

export const DirectlyPayComponent = () => {
  const { publicKey, signTransaction } = useWallet();
  const reference = usePaymentReference();
  const self = useSelf();

  const router = useRouter();
  const { cluster } = router.query;

  const isConfirming = usePaymentStore((s) => s.isConfirming);
  const [loading, setLoading] = useState(false);

  const discoutAmount = getDiscoutAmount(self.discordId);
  const handleDirectPayment = useCallback(async () => {
    try {
      if (!publicKey) {
        throw new WalletNotConnectedError();
      }

      if (loading) {
        return;
      }

      setLoading(true);

      const connection = new Connection(
        getConnectionClusterUrl(cluster as Cluster)
      );

      const transaction = await createTransfer(connection, publicKey, {
        amount: new BigNumber(getSftPrice(undefined, discoutAmount)),
        recipient: SAI_CITIZEN_WALLET_DESTINATION,
        splToken:
          cluster === "devnet" ? DEVNET_USDC_TOKEN_MINT : USDC_TOKEN_MINT,
        reference: new PublicKey(reference),
      });

      const signedTx = await signTransaction?.(transaction);

      if (signedTx) {
        const latestBlockhash = await connection.getLatestBlockhash();

        const signature = await connection.sendRawTransaction(
          signedTx.serialize()
        );

        await connection.confirmTransaction({
          ...latestBlockhash,
          signature,
        });
      }
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  }, [cluster, loading, publicKey, reference, signTransaction]);

  return (
    <Button.Neutral
      disabled={loading}
      loading={loading}
      size="small"
      onClick={handleDirectPayment}
    >
      <Translation id="citizenship.checkout.payDirectly.action.title" />
    </Button.Neutral>
  );
};

export const DirectlyPay = () => (
  <SelfRetriever>
    <ReferenceRetriever>
      <DirectlyPayComponent />
    </ReferenceRetriever>
  </SelfRetriever>
);
