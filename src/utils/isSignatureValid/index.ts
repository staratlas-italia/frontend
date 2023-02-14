import * as ed from "@noble/ed25519";
import { PublicKey, Transaction } from "@solana/web3.js";
import bs58 from "bs58";

const MEMO_PROGRAM_ID = new PublicKey(
  "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"
);

export const validateLedgerAuthTx = (
  tx: Transaction,
  nonce: string,
  publicKey: PublicKey
): boolean => {
  try {
    if (!tx.signatures[0].publicKey.equals(publicKey)) {
      return false;
    }

    const inx = tx.instructions[0];

    if (!inx.programId.equals(MEMO_PROGRAM_ID)) {
      return false;
    }

    if (inx.data.toString() != nonce) {
      return false;
    }

    if (!tx.verifySignatures()) {
      return false;
    }
  } catch (e) {
    return false;
  }

  return true;
};

type Param = {
  signature: string;
  message: string;
  signer: PublicKey;
};

export const isSignatureValid = ({
  signature: signStr,
  message,
  signer,
}: Param) => {
  const signatureDecoded = Buffer.from(bs58.decode(signStr), "utf8").toString();

  const [info, signature] = signatureDecoded.split("-");

  try {
    const parsedSignature = JSON.parse(signature);
    const isLedger = info === "ledger";

    if (isLedger) {
      const { transaction: base64Tx } = parsedSignature;
      const transaction = Transaction.from(Buffer.from(base64Tx, "base64"));

      return validateLedgerAuthTx(transaction, message, signer);
    }

    const signBuffer = Buffer.from(parsedSignature);

    const messageBytes = new TextEncoder().encode(message);

    return ed.sync.verify(signBuffer, messageBytes, signer.toBytes());
  } catch (e) {
    return false;
  }
};
