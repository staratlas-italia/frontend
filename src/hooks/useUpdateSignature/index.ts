import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { constVoid, pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";
import * as T from "fp-ts/Task";
import * as TE from "fp-ts/TaskEither";
import { useCallback, useMemo } from "react";
import { useAuthStore } from "~/stores/useAuthStore";
import { getProofMessage } from "~/utils/getProofMessage";
import { createProof } from "./createProof";
import { logCreateProofError } from "./logCreateProofError";

export const useUpdateSignature = () => {
  const { connection } = useConnection();
  const { publicKey, signTransaction, signMessage } = useWallet();
  const updateSignature = useAuthStore((s) => s.updateSignature);
  const message = useMemo(() => getProofMessage(), []);

  return useCallback(
    () =>
      pipe(
        O.fromNullable(publicKey),
        O.match(constVoid, (publicKey) =>
          pipe(
            createProof({
              connection,
              publicKey,
              message,
              signMessage,
              signTransaction,
            }),
            TE.fold(
              (err) => T.fromIO(logCreateProofError(err)),
              (bs58EncodedProof) =>
                T.fromIO(() => updateSignature(bs58EncodedProof))
            )
          )()
        )
      ),
    [
      connection,
      message,
      publicKey,
      signMessage,
      signTransaction,
      updateSignature,
    ]
  );
};
