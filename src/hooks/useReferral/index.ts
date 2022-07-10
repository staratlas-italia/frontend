import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useState } from "react";
import { createReferral } from "~/network/referral";
import { useAuthStore } from "~/stores/useAuthStore";

export const useReferral = () => {
  const [code, setCode] = useState<string | null>(null);

  const { publicKey } = useWallet();
  const signature = useAuthStore((s) => s.signature);

  const create = useCallback(async () => {
    if (publicKey && signature) {
      const code = await createReferral(publicKey.toString(), signature);

      setCode(code);
    }
  }, [publicKey, signature]);

  return { code, create };
};
