import { createQR, encodeURL, TransferRequestURLFields } from "@solana/pay";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import BigNumber from "bignumber.js";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef } from "react";
import {
  DEVNET_USDC_TOKEN_MINT,
  SAI_CITIZEN_WALLET_DESTINATION,
  USDC_TOKEN_MINT,
} from "~/common/constants";
import { Flex } from "~/components/layout/Flex";
import { useSelf } from "~/hooks/useNullableSelf";
import { ConfirmPaymentResponse } from "~/types/api";
import { getApiRoute, getRoute } from "~/utils/getRoute";
import { useFaction } from "../../../../FactionGuard";
import { usePaymentReference } from "../usePaymentReference";

const amount = new BigNumber(25);

export const QrCode = () => {
  const self = useSelf();
  const router = useRouter();
  const { cluster } = router.query;

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

  useEffect(() => {
    if (!publicKey) {
      return;
    }

    const interval = setInterval(async () => {
      const response = await fetch(getApiRoute("/api/payment/confirm"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: "25",
          cluster,
          faction,
          userId: self._id.toString(),
          reference,
        }),
      }).then((res) => res.json() as Promise<ConfirmPaymentResponse>);

      if (!response.success) {
        router.push(getRoute("/citizenship/error"));
        return;
      }

      if (response.verified) {
        router.push(getRoute("/citizenship/checkout/confirmed"));
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [cluster, faction, publicKey, reference, router, self._id]);

  return (
    <Flex className="bg-white rounded-lg">
      <div ref={qrRef} />
    </Flex>
  );
};
