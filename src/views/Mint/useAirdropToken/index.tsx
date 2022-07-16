import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import {
  TIER1_TOKEN_MINT_ID,
  TIER2_TOKEN_MINT_ID,
  TIER3_TOKEN_MINT_ID,
} from "~/common/constants";
import { Tier } from "~/types";
import { getTokenBalanceByMint } from "~/utils/getTokenBalanceByMint";

export const useAirdropToken = () => {
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();

  const [loading, setLoading] = useState(false);
  const [tier, setTier] = useState<Tier>();

  useEffect(() => {
    const run = async () => {
      if (connected && publicKey) {
        setLoading(true);

        const promises = [
          TIER1_TOKEN_MINT_ID,
          TIER2_TOKEN_MINT_ID,
          TIER3_TOKEN_MINT_ID,
        ].map(
          async (tierMint) =>
            await getTokenBalanceByMint(connection, publicKey, tierMint)
        );

        const ammounts = (await Promise.all(promises)) as [
          number,
          number,
          number
        ];

        const tierIndex = ammounts.findIndex((item) => item > 0);

        setTimeout(() => {
          if (tierIndex >= 0) {
            setTier(`tier${tierIndex + 1}` as Tier);
          }
          setLoading(false);
        }, 1500);
      }
    };

    run();
  }, [connection, connected, publicKey]);

  return { loading, tier };
};
