import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
import {
  ATLAS_TOKEN_MINT_ID,
  POLIS_TOKEN_MINT_ID,
  USDC_TOKEN_MINT_ID,
} from "~/common/constants";
import { getTokenBalanceByMint } from "~/utils/splToken";

export const useTokenBalance = (tokenMint: string) => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState<number>();

  useEffect(() => {
    if (publicKey) {
      const run = async () => {
        setLoading(true);

        const amount = await getTokenBalanceByMint(
          connection,
          publicKey,
          new PublicKey(tokenMint)
        );
        setAmount(amount);

        setLoading(false);
      };

      run();
    }
  }, [publicKey]);

  return { amount, loading };
};

export const useAtlasBalance = () => useTokenBalance(ATLAS_TOKEN_MINT_ID);
export const usePolisBalance = () => useTokenBalance(POLIS_TOKEN_MINT_ID);
export const useUsdcBalance = () => useTokenBalance(USDC_TOKEN_MINT_ID);
