import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";

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
      try {
        const tokens = await connection.getParsedTokenAccountsByOwner(
          new PublicKey(process.env.GUILD_TREASURY_ADDR || ""),
          {
            mint: new PublicKey(process.env.USDC_MINT_ADDR || ""),
          }
        );
        setTreasury({
          usdcAmount:
            tokens?.value?.[0]?.account?.data?.parsed?.info?.tokenAmount
              ?.uiAmount,
        });
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    run();
  }, []);

  return { loading, treasury };
};
