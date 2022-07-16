import { Connection, PublicKey } from "@solana/web3.js";

export const getTokenBalance = async (
  connection: Connection,
  tokenAccountPubkey: PublicKey
) => {
  try {
    const balance = await connection.getTokenAccountBalance(tokenAccountPubkey);
    if (!balance.value.uiAmount) {
      return 0;
    }
    return balance.value.uiAmount;
  } catch (_) {
    return 0;
  }
};
