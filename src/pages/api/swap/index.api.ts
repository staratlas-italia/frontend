import { AnchorProvider, BN, Program } from "@project-serum/anchor";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import {
  Cluster,
  Connection,
  Keypair,
  PublicKey,
  Transaction,
} from "@solana/web3.js";
import { pipe } from "fp-ts/function";
import { NextApiRequest, NextApiResponse } from "next";
import {
  APP_BASE_URL,
  DEVNET_TOKEN_SWAP_STATE_ACCOUNTS,
  DEVNET_USDC_TOKEN_MINT,
  SAI_TOKEN_SWAP_PROGRAM_ID,
  TOKEN_SWAP_STATE_ACCOUNTS,
  USDC_TOKEN_MINT,
} from "~/common/constants";
import { matchMethodMiddleware } from "~/middlewares/matchMethod";
import { IDL } from "~/programs/sai_token_swap";
import { getConnectionClusterUrl } from "~/utils/connection";

const getSwapState = (cluster?: Cluster) =>
  cluster === "devnet"
    ? DEVNET_TOKEN_SWAP_STATE_ACCOUNTS
    : TOKEN_SWAP_STATE_ACCOUNTS;

const getHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const stateAccountField = req.query.stateAccount as string;
  const clusterField = req.query.cluster as Cluster | undefined;

  const state = getSwapState(clusterField)[stateAccountField];
  const path = state.image.square;

  res.status(200).json({
    label: state.name,
    icon: `${APP_BASE_URL}${path}`,
  });
};

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const accountField = req.body?.account;
  const stateAccountField = req.query.stateAccount as string;
  const referenceField = req.query.reference as string;
  const publicKeyField = req.query.publicKey as string;
  const clusterField = req.query.cluster as Cluster | undefined;

  if (
    !accountField ||
    !stateAccountField ||
    !publicKeyField ||
    !referenceField
  ) {
    throw new Error("Invalid params");
  }

  const owner = new PublicKey(accountField);
  const publicKey = new PublicKey(publicKeyField);

  if (!owner.equals(publicKey)) {
    throw new Error("Not same publickey!");
  }

  const reference = new PublicKey(referenceField);
  const stateAccount = new PublicKey(stateAccountField);

  const connection = new Connection(getConnectionClusterUrl(clusterField));

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
    clusterField === "devnet" ? DEVNET_USDC_TOKEN_MINT : USDC_TOKEN_MINT,
    owner
  );

  const state = getSwapState(clusterField)[stateAccountField];

  const buyerInTokenAccount = await getAssociatedTokenAddress(
    state.mint,
    owner
  );

  const swapIx = await program.methods
    .swap(new BN(1))
    .accounts({
      mint: state.mint,
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

  const message = `Thank you for your purchase of ${state.name}`;

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
