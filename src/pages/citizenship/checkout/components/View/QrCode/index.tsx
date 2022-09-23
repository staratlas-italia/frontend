import { createQR, encodeURL, TransferRequestURLFields } from "@solana/pay";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import BigNumber from "bignumber.js";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useRef } from "react";
import {
  DEVNET_USDC_TOKEN_MINT,
  SAI_CITIZEN_WALLET_DESTINATION,
  USDC_TOKEN_MINT,
} from "~/common/constants";
import { useCluster } from "~/components/ClusterProvider";
import { Flex } from "~/components/layout/Flex";
import { confirmPayment } from "~/network/payments/confirm";
import { getRoute } from "~/utils/getRoute";
import { useFaction } from "../../../../FactionGuard";
import { usePaymentReference } from "../usePaymentReference";

const amount = new BigNumber(25);

export const QrCode = () => {
  const router = useRouter();
  const { cluster } = useCluster();

  const faction = useFaction();
  const { publicKey } = useWallet();
  const reference = usePaymentReference();
  const qrRef = useRef<HTMLDivElement>(null);

  const url = useMemo(() => {
    const params: TransferRequestURLFields = {
      recipient: SAI_CITIZEN_WALLET_DESTINATION,
      splToken: cluster === "devnet" ? DEVNET_USDC_TOKEN_MINT : USDC_TOKEN_MINT,
      amount,
      reference: new PublicKey(reference),
      label: "StarAtlasItalia Citizenship",
      message: "Thanks for your order!",
    };

    return encodeURL(params);
  }, [cluster, reference]);

  useEffect(() => {
    const qr = createQR(url, 250, "transparent");

    if (qrRef.current && amount.isGreaterThan(0)) {
      qrRef.current.innerHTML = "";
      qr.append(qrRef.current);
    }
  });

  const recusiveConfirm = useCallback(async () => {
    if (!publicKey) {
      return;
    }

    const response = await confirmPayment({
      cluster,
      faction,
      publicKey: publicKey.toString(),
      reference,
    });

    if (!response.success) {
      router.push(getRoute("/citizenship/error"));
      return;
    }

    if (response.verified) {
      router.push(getRoute("/citizenship/checkout/confirmed"));
      return;
    }

    setTimeout(() => recusiveConfirm(), 500);
  }, [cluster, faction, publicKey, reference, router]);

  useEffect(() => {
    recusiveConfirm();
  }, [publicKey, recusiveConfirm]);

  return (
    <Flex className="bg-white rounded-lg">
      <div ref={qrRef} />
    </Flex>
  );
};
