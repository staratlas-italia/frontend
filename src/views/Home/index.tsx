import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useEffect } from "react";
import {
  AMMO_TOKEN_MINT_ID,
  ATLAS_TOKEN_MINT_ID,
  FOOD_TOKEN_MINT_ID,
  FUEL_TOKEN_MINT_ID,
  TOOL_TOKEN_MINT_ID,
  USDC_TOKEN_MINT_ID,
} from "~/common/constants";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Flex } from "~/components/layout/Flex";
import { Treasury } from "~/components/layout/Header/components/Treasury";
import { deserializeTokenAccount, getTokenBalance } from "~/utils/splToken";
import { EnlistBanner } from "~/views/Home/components/EnlistBanner";
import { WelcomeBanner } from "~/views/Home/components/WelcomeBanner";

export const HomePage = () => {
  const { connection } = useConnection();

  useEffect(() => {
    const run = async () => {
      const tokens = await connection.getParsedTokenAccountsByOwner(
        new PublicKey("HhDDM3vAWQ5scee7jnsMrENXYnYjqxNgRQfuqkaVMaiR"),
        {
          programId: new PublicKey(
            "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          ),
        }
      );
      connection.getParsedProgramAccounts(
        new PublicKey("FLEET1qqzpexyaDpqb2DGsSzE2sDCizewCg9WjrA6DBW"),
        {
          commitment: "recent",
          filters: [{ memcmp: { offset: 0, bytes: "5fDVeiQHZre" } }],
        }
      );
      connection.getParsedAccountInfo(
        new PublicKey("HhDDM3vAWQ5scee7jnsMrENXYnYjqxNgRQfuqkaVMaiR")
      );

      const filteredTokens = tokens.value.filter(
        (token) =>
          token.account.data.parsed.info.mint === AMMO_TOKEN_MINT_ID ||
          token.account.data.parsed.info.mint === FOOD_TOKEN_MINT_ID ||
          token.account.data.parsed.info.mint === TOOL_TOKEN_MINT_ID ||
          token.account.data.parsed.info.mint === FUEL_TOKEN_MINT_ID ||
          token.account.data.parsed.info.mint === USDC_TOKEN_MINT_ID ||
          token.account.data.parsed.info.mint === ATLAS_TOKEN_MINT_ID
      );

      filteredTokens?.forEach(async (token, index) => {
        const amount = await getTokenBalance(
          connection,
          new PublicKey(token.pubkey)
        );

        const deserializedToken = await deserializeTokenAccount(
          connection,
          new PublicKey(token.account.data.parsed.info.mint),
          new PublicKey(token.pubkey)
        );

        console.log(token.account.data.parsed.info.mint, amount);
        console.log(deserializedToken);
      });
    };
    run();
  }, []);
  return (
    <div className="space-y-10">
      <Flex>
        <BlurBackground px={4} py={3}>
          <Treasury />
        </BlurBackground>
      </Flex>

      <WelcomeBanner />
      <EnlistBanner />
    </div>
  );
};
