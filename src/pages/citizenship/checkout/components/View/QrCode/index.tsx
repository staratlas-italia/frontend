import { createQR, encodeURL, TransferRequestURLFields } from "@solana/pay";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import BigNumber from "bignumber.js";
import { useRouter } from "next/router";
import { memo, useCallback, useEffect, useMemo, useRef } from "react";
import {
  DEVNET_USDC_TOKEN_MINT,
  SAI_CITIZEN_WALLET_DESTINATION,
  USDC_TOKEN_MINT,
} from "~/common/constants";
import { useCluster } from "~/components/ClusterProvider";
import { Flex } from "~/components/layout/Flex";
import { useSftPrice } from "~/hooks/useSftPrice";
import { transferPayment } from "~/network/payments/transfer";
import { usePaymentStore } from "~/stores/usePaymentStore";
import { getRoute } from "~/utils/getRoute";
import { useFaction } from "../../../../FactionGuard";
import { usePaymentReference } from "../usePaymentReference";
import { usePaymentReturnReference } from "../usePaymentReturnReference";

export const QrCode = memo(() => {
  const router = useRouter();
  const amount = useSftPrice();
  const { cluster } = useCluster();
  const confirmPayment = usePaymentStore((s) => s.confirm);

  const faction = useFaction();
  const { publicKey } = useWallet();
  const reference = usePaymentReference();
  const returnReference = usePaymentReturnReference();
  const qrRef = useRef<HTMLDivElement>(null);

  const url = useMemo(() => {
    const params: TransferRequestURLFields = {
      amount: new BigNumber(amount),
      label: "StarAtlasItalia Citizenship",
      message: "Thanks for your order!",
      recipient: SAI_CITIZEN_WALLET_DESTINATION,
      reference: new PublicKey(reference),
      splToken: cluster === "devnet" ? DEVNET_USDC_TOKEN_MINT : USDC_TOKEN_MINT,
    };

    return encodeURL(params);
  }, [amount, cluster, reference]);

  useEffect(() => {
    const qr = createQR(url, 250, "transparent");

    if (qrRef.current && amount > 0) {
      qrRef.current.innerHTML = "";
      qr.append(qrRef.current);
    }
  });

  const recusiveConfirm = useCallback(async () => {
    if (!publicKey) {
      return;
    }

    const status = await confirmPayment({
      cluster,
      publicKey: publicKey.toString(),
      reference,
    });

    if (status !== null) {
      if (status) {
        const transferResult = await transferPayment({
          cluster,
          faction,
          publicKey: publicKey.toString(),
          reference,
          returnReference,
        });

        if (transferResult.success && transferResult.eligible) {
          router.push(getRoute("/citizenship/checkout/confirmed"));

          return;
        }
      }

      router.push(getRoute("/citizenship/checkout/error"));

      return;
    }

    return setTimeout(() => recusiveConfirm(), 2000);
  }, [
    cluster,
    confirmPayment,
    faction,
    publicKey,
    reference,
    returnReference,
    router,
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
