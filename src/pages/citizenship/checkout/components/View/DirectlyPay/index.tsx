import { createTransfer } from "@solana/pay";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useWallet } from "@solana/wallet-adapter-react";
import { Cluster, Connection, PublicKey } from "@solana/web3.js";
import BigNumber from "bignumber.js";
import { useRouter } from "next/router";
import { useCallback } from "react";
import {
  DEVNET_USDC_TOKEN_MINT,
  SAI_CITIZEN_WALLET_DESTINATION,
  USDC_TOKEN_MINT,
} from "~/common/constants";
import { Button } from "~/components/controls/Button";
import { SelfRetriever } from "~/components/SelfRetriever";
import { getSftPrice } from "~/hooks/useSftPrice";
import { Translation } from "~/i18n/Translation";
import { getConnectionClusterUrl } from "~/utils/connection";
import { ReferenceRetriever } from "../../ReferenceRetriever";
import { usePaymentReference } from "../usePaymentReference";

export const DirectlyPayComponent = () => {
  const { publicKey, signTransaction } = useWallet();
  const reference = usePaymentReference();

  const router = useRouter();
  const { cluster } = router.query;

  const handleDirectPayment = useCallback(async () => {
    try {
      if (!publicKey) {
        throw new WalletNotConnectedError();
      }

      const connection = new Connection(
        getConnectionClusterUrl(cluster as Cluster)
      );

      const transaction = await createTransfer(connection, publicKey, {
        amount: new BigNumber(getSftPrice()),
        recipient: SAI_CITIZEN_WALLET_DESTINATION,
        splToken:
          cluster === "devnet" ? DEVNET_USDC_TOKEN_MINT : USDC_TOKEN_MINT,
        reference: new PublicKey(reference),
      });

      const signedTx = await signTransaction?.(transaction);

      if (signedTx) {
        const signature = await connection.sendRawTransaction(
          signedTx.serialize()
        );

        await connection.confirmTransaction(signature);
      }
    } catch (e) {
      console.log(e);
    }
  }, [cluster, publicKey, reference, signTransaction]);

  return (
    <Button.Neutral size="small" onClick={handleDirectPayment}>
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
