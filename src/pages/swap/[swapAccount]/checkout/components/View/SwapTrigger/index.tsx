import { captureException } from "@sentry/nextjs";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useCallback, useState } from "react";
import { useCluster } from "~/components/ClusterProvider";
import { Button } from "~/components/controls/Button";
import { useSwapStateAccount } from "~/components/SwapStateAccountGuard";
import { useTransactionToast } from "~/hooks/useTransactionToast";
import { Translation } from "~/i18n/Translation";
import { usePaymentReference } from "~/pages/swap/[swapAccount]/checkout/components/ReferenceRetriever";
import { swapToken } from "~/programs";

export const SwapTrigger = () => {
  const { cluster } = useCluster();

  const anchorWallet = useAnchorWallet();
  const { sendTransaction } = useWallet();

  const { connection } = useConnection();
  const { swapAccount, mint, quantity } = useSwapStateAccount();

  const reference = usePaymentReference();
  const showTransactionToast = useTransactionToast();

  const [loading, setLoading] = useState(false);

  const handleDirectPayment = useCallback(async () => {
    if (loading) {
      return;
    }

    try {
      if (!anchorWallet) {
        throw new WalletNotConnectedError();
      }

      setLoading(true);

      const chainInfo = await connection.getLatestBlockhashAndContext();

      const transaction = await swapToken(
        cluster,
        connection,
        anchorWallet,
        swapAccount,
        mint,
        quantity
      );

      transaction.instructions[0].keys.push({
        pubkey: new PublicKey(reference),
        isSigner: false,
        isWritable: false,
      });

      transaction.recentBlockhash = chainInfo.value.blockhash;
      transaction.lastValidBlockHeight = chainInfo.value.lastValidBlockHeight;
      transaction.feePayer = anchorWallet.publicKey;

      showTransactionToast(() => sendTransaction(transaction, connection));
    } catch (e) {
      captureException(e);
    } finally {
      setLoading(false);
    }
  }, [
    loading,
    anchorWallet,
    connection,
    cluster,
    swapAccount,
    mint,
    quantity,
    reference,
    showTransactionToast,
    sendTransaction,
  ]);

  return (
    <Button
      kind="neutral"
      disabled={loading}
      loading={loading}
      size="small"
      onClick={handleDirectPayment}
    >
      <Translation id="citizenship.checkout.payDirectly.action.title" />
    </Button>
  );
};

const Loader = () => (
  <Button kind="neutral" disabled size="small">
    <Translation id="citizenship.checkout.payDirectly.action.title" />
  </Button>
);

SwapTrigger.Loader = Loader;
