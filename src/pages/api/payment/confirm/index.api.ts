import {
  findReference,
  FindReferenceError,
  validateTransfer,
  ValidateTransferError,
} from "@solana/pay";
import { Cluster, clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import BigNumber from "bignumber.js";
import { NextApiRequest, NextApiResponse } from "next";
import {
  DEVNET_USDC_TOKEN_MINT,
  SAI_CITIZEN_WALLET_DESTINATION,
  USDC_TOKEN_MINT,
} from "~/common/constants";
import { attachClusterMiddleware } from "~/middlewares/attachCluster";
import { matchMethodMiddleware } from "~/middlewares/matchMethod";

const handler = async ({ body }: NextApiRequest, res: NextApiResponse) => {
  const {
    amount: amountParam,
    cluster: clusterParam,
    publicKey,
    reference: referenceParam,
  } = body;

  if (!amountParam || !publicKey || !referenceParam) {
    res.status(400).json({
      success: false,
      error: "Invalid parameters supplied.",
    });
    return;
  }

  const cluster = clusterParam as Cluster;

  const reference = new PublicKey(referenceParam);
  const amount = new BigNumber(Number(amountParam as string));
  const connection = new Connection(clusterApiUrl(cluster));

  try {
    const signatureInfo = await findReference(connection, reference, {
      finality: "confirmed",
    });

    await validateTransfer(
      connection,
      signatureInfo.signature,
      {
        recipient: SAI_CITIZEN_WALLET_DESTINATION,
        splToken:
          cluster === "devnet" ? DEVNET_USDC_TOKEN_MINT : USDC_TOKEN_MINT,
        amount,
        reference,
      },
      { commitment: "confirmed" }
    );

    // TODO send something

    res.status(200).json({
      success: true,
      verified: true,
    });

    return;
  } catch (e) {
    if (e instanceof FindReferenceError) {
      console.log("Not found yet", e);

      res.status(200).json({
        success: true,
        verified: false,
      });
      return;
    }

    if (e instanceof ValidateTransferError) {
      console.error("Transaction is invalid", e);

      res.status(200).json({
        success: false,
        error: "Invalid transaction",
      });
      return;
    }

    res.status(200).json({
      success: false,
      error: "Generic error",
    });
  }
};

export default matchMethodMiddleware(attachClusterMiddleware(handler), [
  "POST",
]);
