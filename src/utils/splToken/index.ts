import { deprecated } from "@metaplex-foundation/mpl-token-metadata";
import {
  AccountInfo,
  MintInfo,
  Token,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import axios from "axios";

const { Metadata } = deprecated;

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

type IToken = {
  mint: PublicKey;
  address: PublicKey;
  metadataPDA?: PublicKey;
  metadataOnchain?: any;
};

export const getTokensByOwner = async (
  connection: Connection,
  owner: PublicKey
): Promise<IToken[]> => {
  const tokens = await connection.getParsedTokenAccountsByOwner(owner, {
    programId: TOKEN_PROGRAM_ID,
  });

  // initial filter - only tokens with 0 decimals & of which 1 is present in the wallet
  return tokens.value
    .filter((t) => {
      const amount = t.account.data.parsed.info.tokenAmount;
      return amount.decimals === 0 && amount.uiAmount === 1;
    })
    .map((t) => ({
      address: new PublicKey(t.pubkey),
      mint: new PublicKey(t.account.data.parsed.info.mint),
    }));
};

export async function okToFailAsync(
  callback: any,
  args: any[],
  wantObject = false
) {
  try {
    // mandatory await here, can't just pass down (coz we need to catch error in this scope)
    return await callback(...args);
  } catch (e) {
    console.log(`Oh no! ${callback.name} called with ${args} blew up!`);
    console.log("Full error:", e);
    return wantObject ? {} : undefined;
  }
}

async function getMetadataByMint(
  connection: Connection,
  mint: PublicKey,
  metadataPDA?: PublicKey,
  metadataOnchain?: any
) {
  const pda = metadataPDA ?? (await Metadata.getPDA(mint));
  const onchain =
    metadataOnchain ?? (await Metadata.load(connection, pda)).data;
  const metadataExternal = (await axios.get(onchain?.data?.uri)).data;
  return {
    metadataPDA: pda,
    metadataOnchain: onchain,
    metadataExternal,
  };
}

export type NFT = {
  // spl stuff
  mint: PublicKey;
  address: PublicKey;
  splTokenInfo?: AccountInfo;
  splMintInfo?: MintInfo;
  // metadata stuff
  metadataPDA?: PublicKey;
  metadataOnchain: any;
  metadataExternal?: {
    attributes: Record<string, any>[];
    collection: { name: string; family: string };
    description: string;
    image: string;
    name: string;
    properties: { creators: any[]; files: any[] };
    seller_fee_basis_points: 500;
    symbol: string;
  };
};

async function tokensToEnrichedNFTs(
  connection: Connection,
  tokens: IToken[]
): Promise<NFT[]> {
  return Promise.all(
    tokens.map(async (t) => ({
      mint: t.mint,
      address: t.address,
      // splTokenInfo: await okToFailAsync(deserializeTokenAccount, [
      //   connection,
      //   t.mint,
      //   t.address,
      // ]),
      // splMintInfo: await okToFailAsync(deserializeTokenMint, [
      //   connection,
      //   t.mint,
      // ]),
      ...(await okToFailAsync(
        getMetadataByMint,
        [connection, t.mint, t.metadataPDA, t.metadataOnchain],
        true
      )),
    }))
  );
}

// --------------------------------------- helpers

function filterOutIncompleteNFTs(NFTs: NFT[]): NFT[] {
  return NFTs.filter(
    (n) =>
      n.mint && // guaranteed
      n.metadataOnchain && // guaranteed
      n.metadataExternal // requirement, otherwise no picture
  );
}

// --------------------------------------- interface

export async function getNfts(connection: Connection, owner: PublicKey) {
  const t1 = performance.now();

  let tokens = await getTokensByOwner(connection, owner);

  if (tokens.length === 0) {
    return [];
  }

  const t2 = performance.now();

  console.log(`Found ${tokens.length} tokens`);
  console.log("Time:", (t2 - t1) / 1000);

  const nfts = await tokensToEnrichedNFTs(connection, tokens);
  const t3 = performance.now();
  console.log(`Prepared a total ${nfts.length} NFTs`);
  console.log("Time:", (t3 - t2) / 1000);
  console.log("TOTAL time:", (t3 - t1) / 1000);

  const validNFTs = filterOutIncompleteNFTs(nfts);

  return validNFTs;
}
