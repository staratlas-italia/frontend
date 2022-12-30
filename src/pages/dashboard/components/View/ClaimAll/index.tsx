import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useCallback } from "react";
import { Button } from "~/components/controls/Button";
import { useTransactionToast } from "~/hooks/useTransactionToast";
import { Translation } from "~/i18n/Translation";
import { useTranslation } from "~/i18n/useTranslation";
import { useCitizenshipBadges, useTutorBadge } from "~/stores/useBadgesStore";
import { useFleetClaimAmount, useFleetStore } from "~/stores/useFleetStore";

export const ClaimAll = () => {
  const amount = useFleetClaimAmount();
  const { connection } = useConnection();

  const tutorBadges = useTutorBadge();
  const citizenshipBadges = useCitizenshipBadges();

  const getClaimAllTransactions = useFleetStore(
    (s) => s.getClaimAllTransactions
  );
  const { publicKey, signAllTransactions } = useWallet();

  const showTransactionToast = useTransactionToast();

  const pendingMessage = useTranslation("toast.multiple.pending.transaction");
  const successMessage = useTranslation("toast.multiple.success.transaction");

  const handleClick = useCallback(async () => {
    if (!publicKey) {
      return;
    }

    const txs = await getClaimAllTransactions(connection, publicKey);
    const signedTxs = (await signAllTransactions?.(txs)) || [];

    const signatures = await Promise.all(
      signedTxs.map(async (s) => connection.sendRawTransaction(s.serialize()))
    );

    for (let [index, signature] of signatures.entries()) {
      await showTransactionToast(() => Promise.resolve(signature), {
        pendingMessage: pendingMessage
          .replace("%i", (index + 1).toString())
          .replace("%c", signatures.length.toString()),
        successMessage: successMessage
          .replace("%i", (index + 1).toString())
          .replace("%c", signatures.length.toString()),
      });
    }
  }, [
    publicKey,
    getClaimAllTransactions,
    connection,
    signAllTransactions,
    showTransactionToast,
    pendingMessage,
    successMessage,
  ]);

  const hasTutorOrCitizenshipBadge =
    Boolean(tutorBadges) || Boolean(citizenshipBadges?.length);

  if (!hasTutorOrCitizenshipBadge) {
    return null;
  }

  return (
    <Button.Primary
      className="group"
      size="small"
      onClick={handleClick}
      // disabled={(amount || 0) <= 5}
    >
      <Translation id="fleet.heading.claim.cta" />
    </Button.Primary>
  );
};
