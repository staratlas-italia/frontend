import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import { useEffect } from "react";

import { useAuthStore } from "~/stores/useAuthStore";
import { StrictReactNode } from "~/types";
import { getProofMessage } from "~/utils/getProofMessage";

type Props = {
  children: StrictReactNode;
  loader?: StrictReactNode;
};

export const AssertAuthenticated = ({ children, loader }: Props) => {
  const isAdmin = useAuthStore((s) => s.isAdmin);
  const signature = useAuthStore((s) => s.signature);
  const updateSignature = useAuthStore((s) => s.updateSignature);

  const { publicKey, signMessage } = useWallet();

  useEffect(() => {
    const run = async () => {
      if (!signature) {
        const message = getProofMessage();

        const messageBytes = new TextEncoder().encode(message);

        try {
          const signature = await signMessage?.(messageBytes);

          if (signature && publicKey) {
            const encodedSignature = bs58.encode(signature);

            updateSignature(encodedSignature);
          }
        } catch (e) {}
      }
    };

    run();
  }, [signature]);

  if (publicKey && !isAdmin(publicKey)) {
    return null;
  }

  if (!signature) {
    return <>{loader}</>;
  }

  return <>{children}</>;
};
