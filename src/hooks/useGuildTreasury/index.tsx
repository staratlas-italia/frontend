import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { USDC_TOKEN_MINT } from "~/common/constants";

type GuildTreasury = {
  usdcAmount?: number;
};

type UseGuildTreasuryResult = { loading: boolean; treasury: GuildTreasury };

export const useGuildTreasury = (): UseGuildTreasuryResult => {
  const { connection } = useConnection();
  const [loading, setLoading] = useState(false);
  const [treasury, setTreasury] = useState<GuildTreasury>({});

  useEffect(() => {
    const run = async () => {
      setLoading(true);

      const addrs = process.env.GUILD_TREASURY_ADDR?.split(",") || [];

      const usdcAmount = await addrs.reduce(async (sumP, addr) => {
        let sum = await sumP;

        try {
          const tokens = await connection.getParsedTokenAccountsByOwner(
            new PublicKey(addr),
            {
              mint: USDC_TOKEN_MINT,
            }
          );

          sum +=
            tokens?.value?.[0]?.account?.data?.parsed?.info?.tokenAmount
              ?.uiAmount || 0;

          return sum;
        } catch (e) {
          return sum;
        }
      }, Promise.resolve(0));

      setTreasury({
        usdcAmount: usdcAmount || 0,
      });
      setLoading(false);
    };

    run();
  }, [connection]);

  return { loading, treasury };
};
