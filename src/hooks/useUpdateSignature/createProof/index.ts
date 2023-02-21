import {
  MessageSignerWalletAdapterProps,
  SignerWalletAdapterProps,
  WalletSignTransactionError,
} from "@solana/wallet-adapter-base";
import { Connection, PublicKey } from "@solana/web3.js";
import bs58 from "bs58";
import { Lazy, pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";
import * as TE from "fp-ts/TaskEither";
import { buildAuthLedgerTx } from "~/utils/auth/buildAuthLedgerTx";
import { createError } from "../createError";

export const safeFn = <A, B, C extends string>({
  fn,
  unsupportedErrorCode,
}: {
  fn?: (_: A) => Promise<B>;
  unsupportedErrorCode: C;
}) =>
  pipe(
    O.fromNullable(fn),
    TE.fromOption(() =>
      createError(unsupportedErrorCode)("The function is not supported")
    )
  );

const mapIfUserAbort =
  <A, B extends { type: string; error: Error }, E>(te: Lazy<E>) =>
  (ma: TE.TaskEither<B, A>) => {
    return pipe(
      ma,
      TE.mapLeft((err) => {
        if (
          err.error instanceof WalletSignTransactionError &&
          (err.error.error.code === 4001 ||
            err.error.error.statusCode === 27013)
        ) {
          return te();
        }

        return err;
      })
    );
  };

export const createProof = ({
  publicKey,
  connection,
  message,
  signMessage,
  signTransaction,
}: {
  publicKey: PublicKey;
  connection: Connection;
  message: string;
  signMessage?: MessageSignerWalletAdapterProps["signMessage"];
  signTransaction?: SignerWalletAdapterProps["signTransaction"];
}) =>
  pipe(
    safeFn({
      fn: signMessage,
      unsupportedErrorCode: "SignMessageUnsupported",
    }),
    TE.chainW(
      TE.tryCatchK(
        (signMessage) => signMessage(new TextEncoder().encode(message)),
        createError("SignMessageError")
      )
    ),
    mapIfUserAbort(() =>
      createError("UserAbortError")("The user has aborted the request")
    ),
    TE.map(
      (signedMessage) =>
        `message-${Buffer.from(signedMessage).toString("base64")}`
    ),
    TE.orElse((originalError) =>
      pipe(
        originalError.type,
        O.fromPredicate((type) => type === "SignMessageUnsupported"),
        TE.fromOption(() => originalError),
        TE.chainW(() =>
          pipe(
            TE.tryCatch(
              () => connection.getLatestBlockhash(),
              createError("RetrieveLatestBlockhashError")
            ),
            TE.chainW((recentBlockhash) => {
              const transaction = buildAuthLedgerTx(message);
              transaction.feePayer = publicKey;
              transaction.recentBlockhash = recentBlockhash.blockhash;

              return pipe(
                safeFn({
                  fn: signTransaction,
                  unsupportedErrorCode: "SignTransactionUnsupported",
                }),
                TE.chainW(
                  TE.tryCatchK(
                    (signTx) => signTx(transaction),
                    createError("SignTransactionError")
                  )
                ),
                mapIfUserAbort(() => createError("UserAbortError")(""))
              );
            }),
            TE.map((tx) => `tx-${tx.serialize().toString("base64")}`)
          )
        )
      )
    ),
    TE.map((proof) => bs58.encode(Buffer.from(proof)) as string)
  );

export type TaskEitherLeftType<M extends TE.TaskEither<unknown, unknown>> =
  Extract<Awaited<ReturnType<M>>, { _tag: "Left" }>["left"];

export type CreateProofError = TaskEitherLeftType<
  ReturnType<typeof createProof>
>;
