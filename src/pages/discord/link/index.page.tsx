import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { useCluster } from "~/components/ClusterProvider";
import { Redirect } from "~/components/common/Redirect";
import { getDiscordUser } from "~/network/discord";
import { usePlayerStore } from "~/stores/usePlayerStore";
import { getRoute } from "~/utils/getRoute";
import Card from "./components/card";

const DiscordLink = () => {
  const { publicKey } = useWallet();
  const self = usePlayerStore((state) => state.self);
  const endpoint = useCluster();

  const [discordLinked, setDiscordLinked] = useState(self && !self.discordId);

  const updateSelf = usePlayerStore((state) => state.updateSelf);

  useEffect(() => {
    const parsedHash = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = parsedHash.get("access_token");

    const getUser = async () => {
      if (accessToken) {
        const response = await getDiscordUser(accessToken);
        if (response && response.id && publicKey) {
          updateSelf(endpoint.cluster, publicKey.toString(), response.id);
          setDiscordLinked(true);
        }
      }
    };
    getUser();
  }, [publicKey]);

  if (!discordLinked) {
    return <Card />;
  }

  return <Redirect to={getRoute("/dashboard")} />;
};

export default DiscordLink;
