import { captureException } from "@sentry/nextjs";
import { WalletSignTransactionError } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useCallback } from "react";
import { Button } from "~/components/controls/Button";
import { useBadges } from "~/hooks/useNullableBadges";
import { useTransactionToast } from "~/hooks/useTransactionToast";
import { Translation } from "~/i18n/Translation";
import { useTranslation } from "~/i18n/useTranslation";
import { useCitizenshipBadges, useTutorBadge } from "~/stores/useBadgesStore";
import { useFleetStore } from "~/stores/useFleetStore";
import { allGenesisBadgeMints } from "~/utils/getBadgeByMint";

export const ClaimAll = () => {
  const { connection } = useConnection();

  const badges = useBadges();
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

    try {
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
    } catch (e) {
      if (e instanceof WalletSignTransactionError) {
        if (e.error.code === 4001) {
          return;
        }
      }

      captureException(e, { level: "error" });
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

  const hasGenesisOrTutorOrCitizenshipBadge =
    Boolean(tutorBadges) ||
    Boolean(citizenshipBadges?.length) ||
    badges.some(([badge]) =>
      allGenesisBadgeMints.includes(badge.mintAddress.toString())
    );

  if (!hasGenesisOrTutorOrCitizenshipBadge) {
    return null;
  }

  return (
    <Button kind="primary" className="group" size="small" onClick={handleClick}>
      <Translation id="fleet.heading.claim.cta" />
    </Button>
  );
};
