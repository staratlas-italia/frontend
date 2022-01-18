import {
  AccountInfo,
  MintInfo,
  Token,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";

export const deserializeToken = async (
  connection: Connection,
  mintPubkey: PublicKey
): Promise<Token> => {
  // doesn't matter which keypair goes here, we're not using it for anything. This one is long dox'ed.
  const tempKeypair = Keypair.fromSecretKey(
    Uint8Array.from([
      208, 175, 150, 242, 88, 34, 108, 88, 177, 16, 168, 75, 115, 181, 199, 242,
      120, 4, 78, 75, 19, 227, 13, 215, 184, 108, 226, 53, 111, 149, 179, 84,
      137, 121, 79, 1, 160, 223, 124, 241, 202, 203, 220, 237, 50, 242, 57, 158,
      226, 207, 203, 188, 43, 28, 70, 110, 214, 234, 251, 15, 249, 157, 62, 80,
    ])
  );
  return new Token(connection, mintPubkey, TOKEN_PROGRAM_ID, tempKeypair);
};

export const deserializeTokenAccount = async (
  connection: Connection,
  mintPubkey: PublicKey,
  tokenAccountPubkey: PublicKey
): Promise<AccountInfo> => {
  const t = await deserializeToken(connection, mintPubkey);
  return t.getAccountInfo(tokenAccountPubkey);
};

export const deserializeTokenMint = async (
  connection: Connection,
  mintPubkey: PublicKey
): Promise<MintInfo> => {
  const t = await deserializeToken(connection, mintPubkey);
  return t.getMintInfo();
};

const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID: PublicKey = new PublicKey(
  "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
);

export async function findAssociatedTokenAddress(
  walletAddress: PublicKey,
  tokenMintAddress: PublicKey
): Promise<PublicKey> {
  return (
    await PublicKey.findProgramAddress(
      [
        walletAddress.toBuffer(),
        TOKEN_PROGRAM_ID.toBuffer(),
        tokenMintAddress.toBuffer(),
      ],
      SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
    )
  )[0];
}

export const getTokenBalanceByMint = async (
  connection: Connection,
  walletPbk: PublicKey,
  tokenMintPbk: PublicKey
): Promise<number> => {
  const associatedTokenPbk = await findAssociatedTokenAddress(
    walletPbk,
    tokenMintPbk
  );
  return await getTokenBalance(connection, associatedTokenPbk);
};

const getTokenBalance = async (
  connection: Connection,
  tokenAccountPubkey: PublicKey
): Promise<number> => {
  try {
    const balance = await connection.getTokenAccountBalance(tokenAccountPubkey);
    if (!balance.value.uiAmount) {
      return 0;
    }
    return balance.value.uiAmount;
  } catch (e) {
    return 0;
  }
};
