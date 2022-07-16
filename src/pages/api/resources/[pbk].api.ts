import { Connection, PublicKey } from "@solana/web3.js";
import { NextApiRequest, NextApiResponse } from "next";
import {
  AMMO_TOKEN_MINT_ID,
  FOOD_TOKEN_MINT_ID,
  FUEL_TOKEN_MINT_ID,
  TOOL_TOKEN_MINT_ID,
} from "~/common/constants/index";
import { getConnectionContext } from "~/utils/connection";
import { getTokenBalanceByMint } from "~/utils/getTokenBalanceByMint";
import { isPublicKey } from "~/utils/pubkey";

const connection = new Connection(
  getConnectionContext("mainnet-beta").endpoint
);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { pbk },
  } = req;

  if (!isPublicKey(pbk as string)) {
    res.status(200).json({
      success: false,
      error: "Invalid pubkey",
    });
    return;
  }

  const foodAmountAccount = await getTokenBalanceByMint(
    connection,
    new PublicKey(pbk),
    new PublicKey(FOOD_TOKEN_MINT_ID)
  );

  const fuelAmountAccount = await getTokenBalanceByMint(
    connection,
    new PublicKey(pbk),
    new PublicKey(FUEL_TOKEN_MINT_ID)
  );

  const ammoAmountAccount = await getTokenBalanceByMint(
    connection,
    new PublicKey(pbk),
    new PublicKey(AMMO_TOKEN_MINT_ID)
  );

  const toolAmountAccount = await getTokenBalanceByMint(
    connection,
    new PublicKey(pbk),
    new PublicKey(TOOL_TOKEN_MINT_ID)
  );

  res.status(200).json({
    success: true,
    data: {
      food: foodAmountAccount,
      fuel: fuelAmountAccount,
      ammo: ammoAmountAccount,
      tools: toolAmountAccount,
    },
  });
};
