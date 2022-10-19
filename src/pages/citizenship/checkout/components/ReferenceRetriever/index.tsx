import { captureException } from "@sentry/nextjs";
import { useWallet } from "@solana/wallet-adapter-react";
import { Cluster } from "@solana/web3.js";
import { useRouter } from "next/router";
import { PropsWithChildren, ReactNode, useEffect } from "react";
import { useFaction } from "~/pages/citizenship/FactionGuard";
import { usePaymentStore } from "~/stores/usePaymentStore";
import { fillUrlParameters } from "~/utils/fillUrlParameters";
import { getRoute } from "~/utils/getRoute";

type Props = {
  loader?: ReactNode;
};

export const ReferenceRetriever = ({
  children,
  loader,
}: PropsWithChildren<Props>) => {
  const faction = useFaction();
  const { publicKey } = useWallet();

  const [reference, fetchReference] = usePaymentStore((s) => [
    s.reference,
    s.fetchReference,
  ]);

  const { query, replace } = useRouter();

  const { cluster } = query;

  useEffect(() => {
    if (publicKey && !reference) {
      try {
        fetchReference({ cluster: cluster as Cluster, publicKey });
      } catch (e) {
        captureException(e, { level: "error" });

        replace(
          fillUrlParameters(getRoute("/citizenship/:faction"), {
            faction: faction.toLowerCase(),
          })
        );
      }
    }
  }, [reference, fetchReference, cluster, replace, publicKey, faction]);

  if (reference === null && loader) {
    return <>{loader}</>;
  }

  if (!reference) {
    return null;
  }

  return <>{children}</>;
};
