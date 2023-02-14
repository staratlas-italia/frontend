import { captureException } from "@sentry/nextjs";
import { WalletSignTransactionError } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { Text } from "~/components/common/Text";
import { Button } from "~/components/controls/Button";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Translation } from "~/i18n/Translation";
import { useTranslation } from "~/i18n/useTranslation";
import { useAuthStore } from "~/stores/useAuthStore";
import { buildAuthLedgerTx } from "~/utils/auth/buildAuthLedgerTx";
import { getProofMessage } from "~/utils/getProofMessage";

export const SignatureRefresher = () => {
  const { connection } = useConnection();
  const { publicKey, signMessage, signTransaction, wallet } = useWallet();

  const updateSignature = useAuthStore((s) => s.updateSignature);

  const toastErrorMessage = useTranslation("generic.error.denied");

  const handleUpdate = useCallback(async () => {
    if (!publicKey) {
      return;
    }

    const message = getProofMessage();
    try {
      if (wallet?.adapter.name === "Ledger") {
        const recentBlockhash = await connection.getLatestBlockhash();

        const ledgerTx = buildAuthLedgerTx(message);
        ledgerTx.feePayer = publicKey;
        ledgerTx.recentBlockhash = recentBlockhash.blockhash;

        const signedTx = await signTransaction?.(ledgerTx);

        if (signedTx) {
          const serializedTx = signedTx.serialize().toString("base64");

          const encodedSignature = bs58.encode(
            Buffer.from(
              `ledger-${JSON.stringify({ transaction: serializedTx })}`
            )
          );

          updateSignature(encodedSignature);
        }
      } else {
        const messageBytes = new TextEncoder().encode(message);

        const newSignature = await signMessage?.(messageBytes);

        if (newSignature) {
          const encodedSignature = bs58.encode(
            Buffer.from(`normal-${JSON.stringify(newSignature)}`)
          );

          updateSignature(encodedSignature);
        }
      }
    } catch (e) {
      console.log(e);
      if (e instanceof WalletSignTransactionError) {
        if (e.error.code === 4001) {
          // User cancel request
          return;
        }
      }

      captureException(e, { level: "error" });

      toast.error(toastErrorMessage);
    }
  }, [
    connection,
    publicKey,
    signMessage,
    signTransaction,
    toastErrorMessage,
    updateSignature,
    wallet?.adapter.name,
  ]);

  return (
    <BlurBackground
      p={5}
      direction="col"
      className="mx-auto space-y-3"
      justify="center"
      align="center"
    >
      <Text size="xl" color="text-white" weight="semibold">
        <Translation id="auth.sign.description" />
      </Text>

      <Button kind="neutral" size="small" onClick={handleUpdate}>
        <Translation id="auth.sign.cta" />
      </Button>
    </BlurBackground>
  );
};
