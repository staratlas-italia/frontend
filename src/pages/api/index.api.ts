import { AnchorProvider, BN, Program } from "@project-serum/anchor";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import {
  clusterApiUrl,
  Connection,
  Keypair,
  PublicKey,
  Transaction,
} from "@solana/web3.js";
import { pipe } from "fp-ts/function";
import { NextApiRequest, NextApiResponse } from "next";
import { SAI_TOKEN_SWAP_PROGRAM_ID, USDC_TOKEN_MINT } from "~/common/constants";
import { matchMethodMiddleware } from "~/middlewares/matchMethod";
import { IDL } from "~/programs/sai_token_swap";

const getHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const label = "Exiled Apes Academy";

  const icon =
    "https://exiledapes.academy/wp-content/uploads/2021/09/X_share.png";

  res.status(200).json({
    label,
    icon,
  });
};

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const accountField = req.body?.account;
  const mintField = req.query.mint as string;
  const stateAccountField = req.query.stateAcount as string;
  const referenceField = req.query.reference as string;

  if (!accountField || !mintField || !stateAccountField || !referenceField) {
    throw new Error("Invalid params");
  }

  const mint = new PublicKey(mintField);
  const owner = new PublicKey(accountField);
  const reference = new PublicKey(referenceField);
  const stateAccount = new PublicKey(stateAccountField);

  const connection = new Connection(clusterApiUrl("mainnet-beta"));

  const provider = new AnchorProvider(
    connection,
    new NodeWallet(Keypair.generate()),
    AnchorProvider.defaultOptions()
  );

  const program = new Program(IDL, SAI_TOKEN_SWAP_PROGRAM_ID, provider);

  const [vaultPda] = await PublicKey.findProgramAddress(
    [Buffer.from("vault"), stateAccount.toBuffer()],
    SAI_TOKEN_SWAP_PROGRAM_ID
  );

  const [proceedsVaultPda] = await PublicKey.findProgramAddress(
    [Buffer.from("proceeds_vault"), stateAccount.toBuffer()],
    SAI_TOKEN_SWAP_PROGRAM_ID
  );

  const buyerOutTokenAccount = await getAssociatedTokenAddress(
    USDC_TOKEN_MINT,
    owner
  );

  const buyerInTokenAccount = await getAssociatedTokenAddress(mint, owner);

  const swapIx = await program.methods
    .swap(new BN(1))
    .accounts({
      mint,
      buyerInTokenAccount,
      buyerOutTokenAccount,
      state: stateAccount,
      buyer: owner,
      vault: vaultPda,
      proceedsVault: proceedsVaultPda,
    })
    .instruction();

  swapIx.keys.push({
    pubkey: reference,
    isWritable: false,
    isSigner: false,
  });

  const chainInfo = await connection.getLatestBlockhashAndContext();

  const transaction = new Transaction({
    feePayer: owner,
    ...chainInfo.value,
  });

  transaction.add(swapIx);

  const serializedTransaction = transaction.serialize({
    requireAllSignatures: false,
    verifySignatures: false,
  });

  const base64Transaction = serializedTransaction.toString("base64");
  const message = "Thank you for your purchase of ExiledApe #518";

  res.status(200).json({ transaction: base64Transaction, message });
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      return getHandler(req, res);
    case "POST":
      return postHandler(req, res);
  }
};

export default pipe(handler, matchMethodMiddleware(["GET", "POST"]));
