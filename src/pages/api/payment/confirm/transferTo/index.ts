import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import * as base58 from "bs58";
import { MAIN_PRIVATE_KEY } from "~/common/constants";

type Param = {
  connection: Connection;
  mint: PublicKey;
  recipient: PublicKey;
};

export const transferTo = async ({ connection, mint, recipient }: Param) => {
  const payer = Keypair.fromSecretKey(base58.decode(MAIN_PRIVATE_KEY));

  console.log(payer.publicKey.toString());

  const numberTokens = 1;

  const account = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mint,
    recipient
  );

  const txid = await mintTo(
    connection,
    payer,
    mint,
    account.address,
    payer,
    numberTokens * Math.pow(10, 0)
  );

  console.log(
    `Succesfully minted ${numberTokens} to ${recipient.toString()}. TXID: ${txid} \n`
  );
};
