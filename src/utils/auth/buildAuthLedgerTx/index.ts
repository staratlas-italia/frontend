import { Transaction, TransactionInstruction } from "@solana/web3.js";
import { MEMO_PROGRAM_ID } from "~/common/constants";

export const buildAuthLedgerTx = (nonce: string): Transaction => {
  const tx = new Transaction();
  tx.add(
    new TransactionInstruction({
      programId: MEMO_PROGRAM_ID,
      keys: [],
      data: Buffer.from(nonce, "utf8"),
    })
  );

  return tx;
};
