import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { useSignature } from "~/components/auth/AssertAuthenticated/useSignature";
import { Loader } from "~/components/common/Loader";
import { Redirect } from "~/components/common/Redirect";
import { Text } from "~/components/common/Text";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Container } from "~/components/layout/Container";
import { Flex } from "~/components/layout/Flex";
import { Logo } from "~/components/layout/Header";
import { Wallet } from "~/components/Wallet";
import { useSelf } from "~/hooks/useNullableSelf";
import { Translation } from "~/i18n/Translation";
import { getDiscordSelf } from "~/network/discord";
import { usePlayerStore } from "~/stores/usePlayerStore";
import { getRoute, Routes } from "~/utils/getRoute";

export const View = () => {
  const { publicKey } = useWallet();

  const self = useSelf();

  const linkDiscord = usePlayerStore((state) => state.linkDiscord);

  const [done, setDone] = useState(false);
  const [pathname, setPathname] = useState("");

  const signature = useSignature();

  useEffect(() => {
    const run = async () => {
      const parsedHash = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = parsedHash.get("access_token");
      const error = parsedHash.get("error");
      setPathname(parsedHash.get("state") || "");

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

      linkDiscord({
        publicKey: publicKey.toString(),
        discordId: discordSelf.id,
        signature,
      });
    };

    run();
  }, [publicKey, linkDiscord, signature]);

  if (self.discordId || done) {
    const route = getRoute(pathname as Routes) || getRoute("/dashboard");

    return <Redirect replace to={route} />;
  }

  return (
    <Container>
      <Flex direction="col" align="center" justify="center" pt={52}>
        <BlurBackground
          p={8}
          className="max-w-screen-md space-y-3"
          direction="col"
        >
          <Flex align="center" justify="between" className="space-x-3">
            <Flex>
              <Logo />
            </Flex>

            <Flex className="space-x-3">
              <Wallet hideSettings />
            </Flex>
          </Flex>

          <Flex align="center" className="space-x-2">
            <Loader color="text-white" />

            <Text size="xl" color="text-white" weight="semibold">
              <Translation id="discord.link.description" />
            </Text>
          </Flex>
        </BlurBackground>
      </Flex>
    </Container>
  );
};
