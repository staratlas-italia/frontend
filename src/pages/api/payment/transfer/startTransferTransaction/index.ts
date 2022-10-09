import { captureException } from "@sentry/nextjs";
import { createTransfer } from "@solana/pay";
import { createAssociatedTokenAccount } from "@solana/spl-token";
import { Cluster, Connection, Keypair, PublicKey } from "@solana/web3.js";
import BigNumber from "bignumber.js";
import * as base58 from "bs58";

type Param = {
  connection: Connection;
  cluster: Cluster;
  mint: PublicKey;
  recipient: PublicKey;
  reference: PublicKey;
};

export const startTransferTransaction = async ({
  connection,
  cluster,
  mint,
  recipient,
  reference,
}: Param) => {
  const payer = Keypair.fromSecretKey(
    base58.decode(
      (cluster === "mainnet-beta"
        ? process.env.MAIN_PRIVATE_KEY
        : process.env.DEVNET_PRIVATE_KEY) || ""
    )
  );

  const numberTokens = 1;

  try {
    await createAssociatedTokenAccount(connection, payer, mint, recipient);
  } catch (e) {
    captureException(e, { level: "error" });
  }

  const transaction = await createTransfer(connection, payer.publicKey, {
    amount: new BigNumber(numberTokens),
    recipient,
    splToken: mint,
    reference,
  });

  const txid = await connection.sendTransaction(transaction, [payer]);

  console.log(
    `Succesfully minted ${numberTokens} to ${recipient.toString()}. TXID: ${txid} \n`
  );
};
