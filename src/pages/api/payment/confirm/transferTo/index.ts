import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import { Cluster, Connection, Keypair, PublicKey } from "@solana/web3.js";
import * as base58 from "bs58";

type Param = {
  connection: Connection;
  cluster: Cluster;
  mint: PublicKey;
  recipient: PublicKey;
};

export const transferTo = async ({
  connection,
  cluster,
  mint,
  recipient,
}: Param) => {
  const payer = Keypair.fromSecretKey(
    base58.decode(
      (cluster === "mainnet-beta"
        ? process.env.MAIN_PRIVATE_KEY
        : process.env.DEVNET_PRIVATE_KEY) || ""
    )
  );

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
