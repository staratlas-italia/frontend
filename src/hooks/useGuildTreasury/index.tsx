import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";

type GuildTreasury = {
  usdcAmount?: number;
};

export const useGuildTreasury = (): GuildTreasury => {
  const { connection } = useConnection();
  const [treasury, setTreasury] = useState<GuildTreasury>({});

  useEffect(() => {
    const run = async () => {
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
      } catch (e) {
        console.log(e);
      }
    };
    run();
  }, []);

  return treasury;
};
