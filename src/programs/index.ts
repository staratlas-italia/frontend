import { AnchorProvider, BN, Program } from "@project-serum/anchor";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { Cluster, Connection, Keypair, PublicKey } from "@solana/web3.js";
import { AnchorTypes } from "@staratlas/factory/dist/anchor/types";
import {
  DEVNET_USDC_TOKEN_MINT,
  SAI_TOKEN_SWAP_PROGRAM_ID,
  USDC_TOKEN_MINT,
} from "~/common/constants";
import { IDL, SaiTokenSwap } from "~/programs/sai_token_swap";

type SwapTypes = AnchorTypes<SaiTokenSwap>;

type SwapState = SwapTypes["Accounts"]["state"];

export const getSaiTokenSwapProgram = (
  connection: Connection,
  wallet: AnchorWallet
) => {
  const provider = new AnchorProvider(
    connection,
    wallet,
    AnchorProvider.defaultOptions()
  );

  return new Program(IDL, SAI_TOKEN_SWAP_PROGRAM_ID, provider);
};

export const getAllSwapStates = async (
  connection: Connection,
  wallet: AnchorWallet
): Promise<{ account: SwapState; publicKey: PublicKey }[]> => {
  return getSaiTokenSwapProgram(connection, wallet).account.state.all([
    { memcmp: { offset: 50, bytes: wallet.publicKey.toString() } },
  ]);
};

export const fetchSwapPrice = async (
  connection: Connection,
  wallet: AnchorWallet,
  stateAccount: PublicKey
) => {
  return getSaiTokenSwapProgram(connection, wallet).account.state.fetch(
    stateAccount
  );
};

export const initilizeSwap = async (
  connection: Connection,
  wallet: AnchorWallet,
  proceedsMint: PublicKey,
  mint: PublicKey,
  price: number
) => {
  const stateAccount = Keypair.generate();

  const [vaultPda] = await PublicKey.findProgramAddress(
    [Buffer.from("vault"), stateAccount.publicKey.toBuffer()],
    SAI_TOKEN_SWAP_PROGRAM_ID
  );

  const [proceedsVaultPda] = await PublicKey.findProgramAddress(
    [Buffer.from("proceeds_vault"), stateAccount.publicKey.toBuffer()],
    SAI_TOKEN_SWAP_PROGRAM_ID
  );

  return getSaiTokenSwapProgram(connection, wallet)
    .methods.initializeSwap(new BN(price * Math.pow(10, 6)))
    .accounts({
      state: stateAccount.publicKey,
      mint,
      owner: wallet.publicKey,
      vault: vaultPda,
      proceedsVault: proceedsVaultPda,
      proceedsMint,
    })
    .signers([stateAccount])
    .rpc();
};

export const swapToken = async (
  cluster: Cluster,
  connection: Connection,
  wallet: AnchorWallet,
  stateAccount: PublicKey,
  mint: PublicKey,
  amount: number = 1
) => {
  const [vaultPda] = await PublicKey.findProgramAddress(
    [Buffer.from("vault"), stateAccount.toBuffer()],
    SAI_TOKEN_SWAP_PROGRAM_ID
  );

  const [proceedsVaultPda] = await PublicKey.findProgramAddress(
    [Buffer.from("proceeds_vault"), stateAccount.toBuffer()],
    SAI_TOKEN_SWAP_PROGRAM_ID
  );

  const buyerOutTokenAccount = await getAssociatedTokenAddress(
    cluster === "devnet" ? DEVNET_USDC_TOKEN_MINT : USDC_TOKEN_MINT,
    wallet.publicKey
  );

  const buyerInTokenAccount = await getAssociatedTokenAddress(
    mint,
    wallet.publicKey
  );

  return getSaiTokenSwapProgram(connection, wallet)
    .methods.swap(new BN(amount))
    .accounts({
      mint,
      buyerInTokenAccount,
      buyerOutTokenAccount,
      state: stateAccount,
      buyer: wallet.publicKey,
      vault: vaultPda,
      proceedsVault: proceedsVaultPda,
    })
    .transaction();
};

export const startOrStopSell = async (
  connection: Connection,
  wallet: AnchorWallet,
  stateAccount: PublicKey
) => {
  const program = await getSaiTokenSwapProgram(connection, wallet);

  let state = await program.account.state.fetch(stateAccount);

  if (state.active) {
    await program.methods
      .stopSale()
      .accounts({
        owner: wallet.publicKey,
        state: stateAccount,
      })
      .rpc();
  } else {
    await program.methods
      .startSale()
      .accounts({
        owner: wallet.publicKey,
        state: stateAccount,
      })
      .rpc();
  }

  return {
    account: await program.account.state.fetch(stateAccount, "confirmed"),
    publicKey: stateAccount,
  };
};

export const withdrawProceeds = async (
  cluster: Cluster,
  connection: Connection,
  wallet: AnchorWallet,
  stateAccount: PublicKey
) => {
  const program = await getSaiTokenSwapProgram(connection, wallet);

  const [proceedsVaultPda] = await PublicKey.findProgramAddress(
    [Buffer.from("proceeds_vault"), stateAccount.toBuffer()],
    SAI_TOKEN_SWAP_PROGRAM_ID
  );

  const ownerInTokenAccount = await getAssociatedTokenAddress(
    cluster === "devnet" ? DEVNET_USDC_TOKEN_MINT : USDC_TOKEN_MINT,
    wallet.publicKey
  );

  await program.methods
    .withdrawProceeds()
    .accounts({
      state: stateAccount,
      proceedsVault: proceedsVaultPda,
      owner: wallet.publicKey,
      ownerInTokenAccount,
      mint: cluster === "devnet" ? DEVNET_USDC_TOKEN_MINT : USDC_TOKEN_MINT,
    })
    .rpc();
};

export const getWithdrawProceedsInstruction = async (
  cluster: Cluster,
  connection: Connection,
  wallet: AnchorWallet,
  stateAccount: PublicKey
) => {
  const program = await getSaiTokenSwapProgram(connection, wallet);

  const [proceedsVaultPda] = await PublicKey.findProgramAddress(
    [Buffer.from("proceeds_vault"), stateAccount.toBuffer()],
    SAI_TOKEN_SWAP_PROGRAM_ID
  );

  const ownerInTokenAccount = await getAssociatedTokenAddress(
    cluster === "devnet" ? DEVNET_USDC_TOKEN_MINT : USDC_TOKEN_MINT,
    wallet.publicKey
  );

  return program.methods
    .withdrawProceeds()
    .accounts({
      state: stateAccount,
      proceedsVault: proceedsVaultPda,
      owner: wallet.publicKey,
      ownerInTokenAccount,
      mint: cluster === "devnet" ? DEVNET_USDC_TOKEN_MINT : USDC_TOKEN_MINT,
    })
    .instruction();
};
