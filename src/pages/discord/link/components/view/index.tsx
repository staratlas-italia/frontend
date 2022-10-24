import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { useSignature } from "~/components/auth/AssertAuthenticated/useSignature";
import { useCluster } from "~/components/ClusterProvider";
import { Redirect } from "~/components/common/Redirect";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Container } from "~/components/layout/Container";
import { Flex } from "~/components/layout/Flex";
import { Logo } from "~/components/layout/Header";
import { Wallet } from "~/components/Wallet";
import { useSelf } from "~/hooks/useNullableSelf";
import { getDiscordSelf } from "~/network/discord";
import { usePlayerStore } from "~/stores/usePlayerStore";
import { getRoute } from "~/utils/getRoute";

export const View = () => {
  const { publicKey } = useWallet();

  const self = useSelf();
  const endpoint = useCluster();
  const linkDiscord = usePlayerStore((state) => state.linkDiscord);

  const [done, setDone] = useState(false);

  const signature = useSignature();

  useEffect(() => {
    const run = async () => {
      const parsedHash = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = parsedHash.get("access_token");
      const error = parsedHash.get("error");

      if (!accessToken || error === "access_denied") {
        setDone(true);

        return;
      }

      if (!publicKey) {
        return;
      }

      const discordSelf = await getDiscordSelf(accessToken);

      if (!discordSelf) {
        setDone(true);

        return;
      }

      await linkDiscord({
        cluster: endpoint.cluster,
        publicKey: publicKey.toString(),
        discordId: discordSelf.id,
        signature,
      });
    };

    run();
  }, [endpoint.cluster, publicKey, linkDiscord, signature]);

  if (self.discordId || done) {
    return <Redirect replace to={getRoute("/dashboard")} />;
  }

  return (
    <Container>
      <Flex direction="col" align="center" justify="center" pt={52}>
        <BlurBackground p={8} className="max-w-screen-md" direction="col">
          <Flex align="center" pb={5} justify="between">
            <Flex>
              <Logo />
            </Flex>
          </Flex>

          <Flex pt={5} className="space-x-3">
            <Wallet hideSettings />
          </Flex>
        </BlurBackground>
      </Flex>
    </Container>
  );
};
