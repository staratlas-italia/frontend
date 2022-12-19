import { captureException } from "@sentry/nextjs";
import { WalletSignTransactionError } from "@solana/wallet-adapter-base";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { Text } from "~/components/common/Text";
import { Button } from "~/components/controls/Button";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Translation } from "~/i18n/Translation";
import { useTranslation } from "~/i18n/useTranslation";
import { useAuthStore } from "~/stores/useAuthStore";
import { getProofMessage } from "~/utils/getProofMessage";

export const SignatureRefresher = () => {
  const { publicKey, signMessage } = useWallet();

  const updateSignature = useAuthStore((s) => s.updateSignature);

  const toastErrorMessage = useTranslation("generic.error.denied");

  const handleUpdate = useCallback(async () => {
    if (!publicKey) {
      return;
    }

    const message = getProofMessage();

    const messageBytes = new TextEncoder().encode(message);

    try {
      const newSignature = await signMessage?.(messageBytes);

      if (newSignature) {
        const encodedSignature = bs58.encode(newSignature);

        updateSignature(encodedSignature);
      }
    } catch (e) {
      if (e instanceof WalletSignTransactionError) {
        if (e.error.code === 4001) {
          // User cancel request
          return;
        }
      }

      captureException(e, { level: "error" });

      toast.error(toastErrorMessage);
    }
  }, [publicKey, signMessage, toastErrorMessage, updateSignature]);

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

      <Button.Neutral size="small" onClick={handleUpdate}>
        <Translation id="auth.sign.cta" />
      </Button.Neutral>
    </BlurBackground>
  );
};
