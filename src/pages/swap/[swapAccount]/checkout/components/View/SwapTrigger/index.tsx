import { captureException } from "@sentry/nextjs";
import {
  WalletNotConnectedError,
  WalletSignTransactionError,
} from "@solana/wallet-adapter-base";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useCallback, useState } from "react";
import { Button } from "~/components/controls/Button";
import { useSwapStateAccount } from "~/components/SwapStateAccountGuard";
import { Translation } from "~/i18n/Translation";
import { usePaymentReference } from "~/pages/swap/[swapAccount]/checkout/components/ReferenceRetriever";
import { swapToken } from "~/programs";

export const SwapTrigger = () => {
  const anchorWallet = useAnchorWallet();
  const { connection } = useConnection();
  const { swapAccount, mint, quantity } = useSwapStateAccount();

  const reference = usePaymentReference();
  const { signTransaction } = useWallet();

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

      signTransaction?.(transaction);
    } catch (e) {
      if (e instanceof WalletNotConnectedError) {
        return;
      }

      if (e instanceof WalletSignTransactionError) {
        if (e.error.code === 4001) {
          return;
        }
      }

      captureException(e);
    } finally {
      setLoading(false);
    }
  }, [
    loading,
    anchorWallet,
    connection,
    swapAccount,
    mint,
    quantity,
    reference,
    signTransaction,
  ]);

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

const Loader = () => (
  <Button.Neutral disabled size="small">
    <Translation id="citizenship.checkout.payDirectly.action.title" />
  </Button.Neutral>
);

SwapTrigger.Loader = Loader;
