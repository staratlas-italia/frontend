import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import { useEffect } from "react";
import { useAuthStore } from "~/stores/useAuthStore";
import { StrictReactNode } from "~/types";
import { getProofMessage } from "~/utils/getProofMessage";

type Props = {
  adminOnly?: boolean;
  children: StrictReactNode;
  loader?: StrictReactNode;
};

export const AssertAuthenticated = ({ adminOnly, children, loader }: Props) => {
  const isAdmin = useAuthStore((s) => s.isAdmin);
  const signature = useAuthStore((s) => s.signature);
  const updateSignature = useAuthStore((s) => s.updateSignature);
  const signatueIsValid = useAuthStore((s) => s.isValid());

  const { publicKey, signMessage } = useWallet();

  useEffect(() => {
    const run = async () => {
      if (!signature || !signatueIsValid) {
        const message = getProofMessage();

        const messageBytes = new TextEncoder().encode(message);

        try {
          const newSignature = await signMessage?.(messageBytes);

          if (newSignature && publicKey) {
            const encodedSignature = bs58.encode(newSignature);

            updateSignature(encodedSignature);
          }
        } catch (e) {}
      }
    };

    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature, signatueIsValid]);

  if (adminOnly && !isAdmin(publicKey)) {
    return null;
  }

  if (!publicKey) {
    return null;
  }

  if (!signature) {
    return <>{loader}</>;
  }

  return <>{children}</>;
};
