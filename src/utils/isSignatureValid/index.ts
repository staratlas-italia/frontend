import * as ed from "@noble/ed25519";
import { PublicKey } from "@solana/web3.js";
import bs58 from "bs58";

type Param = { signature: string; message: string; signer: PublicKey };

export const isSignatureValid = ({ signature, message, signer }: Param) => {
  const signatureDecoded = bs58.decode(signature);

  const messageBytes = new TextEncoder().encode(message);

  return ed.sync.verify(signatureDecoded, messageBytes, signer.toBytes());
};
