import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import { ReactNode, useEffect } from "react";
import { IS_ADMIN_SIGN_MSG } from "~/common/constants";
import { useAuthStore } from "~/stores/useAuthStore";

type Props = {
  children: ReactNode;
  loader?: ReactNode;
};

export const AssertAuthenticated = ({ children, loader }: Props) => {
  const isAdmin = useAuthStore((s) => s.isAdmin);
  const signature = useAuthStore((s) => s.signature);
  const updateSignature = useAuthStore((s) => s.updateSignature);

  const { publicKey, signMessage } = useWallet();

  useEffect(() => {
    const run = async () => {
      if (!signature) {
        const message = new TextEncoder().encode(IS_ADMIN_SIGN_MSG);

        try {
          const signature = await signMessage?.(message);

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
