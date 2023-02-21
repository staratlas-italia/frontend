import { captureException } from "@sentry/nextjs";
import { constVoid, pipe } from "fp-ts/function";
import * as IO from "fp-ts/IO";
import { CreateProofError } from "~/hooks/useUpdateSignature/createProof";
import { match } from "../match";

const getErrorFingerprint = (e: CreateProofError) =>
  pipe(
    e,
    match({
      RetrieveLatestBlockhashError: ({ error, type }) => [type, error.message],
      SignMessageError: ({ error, type }) => [type, error.message],
      SignMessageUnsupported: ({ error, type }) => [type, error.message],
      SignTransactionError: ({ error, type }) => [type, error.message],
      SignTransactionUnsupported: ({ error, type }) => [type, error.message],
      UserAbortError: () => [],
    })
  );

const logOnSentry =
  (e: CreateProofError): IO.IO<void> =>
  () =>
    captureException({
      error: new Error(`A sign error occurred: ${e.error.message}`),
      options: {
        extra: {
          error: e.error,
        },
        fingerprint: ["auth-sign", ...getErrorFingerprint(e)],
        level: "warning",
        tags: {
          scope: "sign-error",
        },
      },
    });

export const logCreateProofError = (e: CreateProofError): IO.IO<void> =>
  pipe(
    e,
    match({
      RetrieveLatestBlockhashError: logOnSentry,
      SignMessageError: logOnSentry,
      SignMessageUnsupported: logOnSentry,
      SignTransactionError: logOnSentry,
      SignTransactionUnsupported: logOnSentry,
      UserAbortError: () => constVoid,
    })
  );
