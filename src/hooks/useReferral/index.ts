import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useState } from "react";
import { createReferral, redeemReferral } from "~/network/referral";
import { useAuthStore } from "~/stores/useAuthStore";
import { Self } from "~/types/api";

export const useReferral = () => {
  const [code, setCode] = useState<string | null>(null);
  const [redeemingUser, setRedeemingUser] = useState<Self | null>(null);

  const { publicKey } = useWallet();
  const signature = useAuthStore((s) => s.signature);

  const create = useCallback(async () => {
    if (publicKey && signature) {
      const code = await createReferral(publicKey.toString(), signature);

      setCode(code);
    }
  }, [publicKey, signature]);

  const redeem = useCallback(
    async (referralCode: string) => {
      if (publicKey && signature) {
        const user = await redeemReferral(
          publicKey.toString(),
          signature,
          referralCode
        );

        setRedeemingUser(user);
      }
    },
    [publicKey, signature]
  );

  return { code, redeemingUser, create, redeem };
};
