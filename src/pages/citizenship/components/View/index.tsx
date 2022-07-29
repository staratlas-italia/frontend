import { createQR, encodeURL, TransferRequestURLFields } from "@solana/pay";
import { useWallet } from "@solana/wallet-adapter-react";
import { Keypair } from "@solana/web3.js";
import BigNumber from "bignumber.js";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef } from "react";
import {
  DEVNET_USDC_TOKEN_MINT,
  SAI_CITIZEN_WALLET_DESTINATION,
  USDC_TOKEN_MINT,
} from "~/common/constants";
import { Heading } from "~/components/common/Heading";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { ConfirmPaymentResponse } from "~/types/api";
import { getApiRoute, getRoute } from "~/utils/getRoute";

const amount = new BigNumber(25);

export const View = () => {
  const router = useRouter();
  const { publicKey } = useWallet();

  const { cluster } = router.query;

  const qrRef = useRef<HTMLDivElement>(null);
  const reference = useMemo(() => Keypair.generate().publicKey, []);

  const url = useMemo(() => {
    const params: TransferRequestURLFields = {
      recipient: SAI_CITIZEN_WALLET_DESTINATION,
      splToken: cluster === "devnet" ? DEVNET_USDC_TOKEN_MINT : USDC_TOKEN_MINT,
      amount,
      reference,
      label: "StarAtlasItalia Citizenship",
      message: "Thanks for your order!",
    };

    return encodeURL(params);
  }, []);

  useEffect(() => {
    const qr = createQR(url, 318, "transparent", "white");

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
          publicKey: publicKey.toString(),
          reference: reference.toString(),
        }),
      }).then((res) => res.json() as Promise<ConfirmPaymentResponse>);

      if (response.success) {
        if (response.verified) {
          router.push(getRoute("/citizenship/confirmed"));
        }

        return;
      }

      router.push(getRoute("/citizenship/error"));
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [publicKey]);

  return (
    <>
      <Heading title="Scan the QR code with your wallet to proceed with the payment" />

      <BlurBackground>
        <div ref={qrRef} />
      </BlurBackground>
    </>
  );
};
