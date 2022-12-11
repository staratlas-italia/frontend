import { createQR, encodeURL } from "@solana/pay";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/router";
import { memo, useCallback, useEffect, useMemo, useRef } from "react";
import { Flex } from "~/components/layout/Flex";
import { useSwapStateAccount } from "~/components/SwapStateAccountGuard";
import { useSwapProgramPrice } from "~/hooks/useSwapProgramPrice";
import { usePaymentStore } from "~/stores/usePaymentStore";
import { fillUrlParameters } from "~/utils/fillUrlParameters";
import { getRoute } from "~/utils/getRoute";
import { usePaymentReference } from "../../ReferenceRetriever";

export const QrCode = memo(() => {
  const amount = useSwapProgramPrice();
  const router = useRouter();
  const { swapAccount, mint, quantity } = useSwapStateAccount();

  const confirmPayment = usePaymentStore((s) => s.confirm);

  const { publicKey } = useWallet();

  const reference = usePaymentReference();
  const qrRef = useRef<HTMLDivElement>(null);

  const url = useMemo(() => {
    const currentUrl = new URL(
      `${
        "https://c986-2001-b07-5d2b-c19a-c00e-f7bd-1d75-6bd7.ngrok.io/api/" ||
        window.location.origin
      }`
    );

    currentUrl.searchParams.append("stateAccount", swapAccount.toString());
    currentUrl.searchParams.append("mint", mint.toString());
    currentUrl.searchParams.append("reference", reference.toString());

    return encodeURL({
      link: currentUrl,
    });
  }, [mint, reference, swapAccount]);

  useEffect(() => {
    const qr = createQR(url, 250, "transparent");

    if (qrRef.current && amount > 0) {
      qrRef.current.innerHTML = "";
      qr.append(qrRef.current);
    }
  });

  // const onPaymentComplete = useCallback(
  //   (error?: Error | undefined) => {
  //     if (!error) {
  //       router.push(
  //         fillUrlParameters(getRoute("/swap/:swapAccount/checkout/confirmed"), {
  //           swapAccount: swapAccount.toString(),
  //         })
  //       );

  //       return;
  //     }

  //     if (error instanceof WalletSignTransactionError) {
  //       if (error.error.code === 4001) {
  //         // User cancelled the sign
  //         return;
  //       }
  //     }

  //     if (error instanceof AnchorError) {
  //       switch (error.error.errorCode.code) {
  //         case "NotEnoughFunds":
  //           toast.error(notEnoghFundMessage);
  //           break;
  //         default:
  //           router.push(
  //             appendQueryParams(
  //               fillUrlParameters(
  //                 getRoute("/swap/:swapAccount/checkout/error"),
  //                 {
  //                   swapAccount: swapAccount.toString(),
  //                 }
  //               ),
  //               { code: error.error.errorCode.code }
  //             )
  //           );
  //       }

  //       return;
  //     }

  //     router.push(
  //       fillUrlParameters(getRoute("/swap/:swapAccount/checkout/error"), {
  //         swapAccount: swapAccount.toString(),
  //       })
  //     );
  //   },
  //   [notEnoghFundMessage, router, swapAccount]
  // );

  const recusiveConfirm = useCallback(async () => {
    if (!publicKey) {
      return;
    }

    const status = await confirmPayment({
      amount: amount * (quantity || 1),
      publicKey: publicKey.toString(),
      reference,
    });

    if (status !== null) {
      if (status) {
        router.push(
          fillUrlParameters(getRoute("/swap/:swapAccount/checkout/confirmed"), {
            swapAccount: swapAccount.toString(),
          })
        );

        return;
      }

      router.push(
        fillUrlParameters(getRoute("/swap/:swapAccount/checkout/error"), {
          swapAccount: swapAccount.toString(),
        })
      );
      return;
    }
    return setTimeout(() => recusiveConfirm(), 2000);
  }, [
    amount,
    confirmPayment,
    publicKey,
    quantity,
    reference,
    router,
    swapAccount,
  ]);

  useEffect(() => {
    const timeout = recusiveConfirm();

    return () => clearTimeout(timeout);
  }, [publicKey, recusiveConfirm]);

  return (
    <Flex className="bg-white rounded-lg">
      <div ref={qrRef} />
    </Flex>
  );
});

QrCode.displayName = "QrCode";
