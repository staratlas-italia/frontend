import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
import {
  ATLAS_TOKEN_ID,
  POLIS_TOKEN_ID,
  USDC_TOKEN_ID,
} from "~/common/constants";
import { getTokenBalance } from "~/utils/splToken";

export const useTokenBalance = (addr: string) => {
  const { connection } = useConnection();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState<number>();

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      const amount = await getTokenBalance(connection, new PublicKey(addr));
      setAmount(amount);
      setLoading(false);
    };
    run();
  }, []);

  return { amount, loading };
};

export const useAtlasBalance = () => useTokenBalance(ATLAS_TOKEN_ID);
export const usePolisBalance = () => useTokenBalance(POLIS_TOKEN_ID);
export const useUsdcBalance = () => useTokenBalance(USDC_TOKEN_ID);
