import { captureException } from "@sentry/nextjs";
import {
  WalletNotConnectedError,
  WalletSignTransactionError,
} from "@solana/wallet-adapter-base";
import { useConnection } from "@solana/wallet-adapter-react";
import Link from "next/link";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { useCluster } from "~/components/ClusterProvider";
import { Text } from "~/components/common/Text";
import { Flex } from "~/components/layout/Flex";
import { useTranslation } from "~/i18n/useTranslation";

type Options = {
  pendingMessage?: string;
  successMessage?: string;
};

export const useTransactionToast = () => {
  const { cluster } = useCluster();
  const { connection } = useConnection();

  const successTranslation = useTranslation(
    "swap.checkout.transaction.success"
  );

  const pendingTranslation = useTranslation(
    "swap.checkout.transaction.pending"
  );

  const errorTranslation = useTranslation("swap.checkout.transaction.error");
  const solscanTranslation = useTranslation("generic.solscan.check");

  return useCallback(
    async (promiseFn: () => Promise<string>, opts?: Options) => {
      const pendingMessage = opts?.pendingMessage || pendingTranslation;
      const successMessage = opts?.successMessage || successTranslation;

      const id = toast.loading(pendingMessage);

      const showErrorToast = () => {
        toast.update(id, {
          autoClose: 3000,
          type: "error",
          isLoading: false,
          render: errorTranslation,
        });
      };

      try {
        const signature = await promiseFn();

        const interval = setInterval(async () => {
          try {
            const status = await connection.getSignatureStatus(signature, {
              searchTransactionHistory: true,
            });

            if (status.value?.err) {
              clearInterval(interval);

              showErrorToast();
              return;
            }

            if (status.value?.confirmationStatus !== "processed") {
              clearInterval(interval);

              toast.update(id, {
                autoClose: 3000,
                type: signature ? "success" : "error",
                isLoading: false,
                render: () => {
                  if (!signature) {
                    return errorTranslation;
                  }

                  return (
                    <Flex direction="col">
                      <Text color="text-gray-700" weight="semibold" size="lg">
                        {successMessage}
                      </Text>

                      <Link
                        href={`https://solscan.io/tx/${signature}${
                          cluster ? `?cluster=${cluster}` : ""
                        }`}
                        target="_blank"
                      >
                        <Text
                          color="text-blue-700"
                          weight="semibold"
                          decoration="underline"
                        >
                          {solscanTranslation}
                        </Text>
                      </Link>
                    </Flex>
                  );
                },
              });
            }
          } catch (e) {
            captureException(e, { level: "error" });

            clearInterval(interval);
            showErrorToast();
          }
        }, 1500);
      } catch (err) {
        if (err instanceof WalletNotConnectedError) {
          toast.dismiss(id);
          return;
        }

        if (err instanceof WalletSignTransactionError) {
          toast.dismiss(id);
          return;
        }

        showErrorToast;
      }
    },
    [
      cluster,
      connection,
      errorTranslation,
      pendingTranslation,
      solscanTranslation,
      successTranslation,
    ]
  );
};
