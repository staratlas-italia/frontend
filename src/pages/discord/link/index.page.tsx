import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { useCluster } from "~/components/ClusterProvider";
import { Redirect } from "~/components/common/Redirect";
import { getDiscordSelf } from "~/network/discord";
import { usePlayerStore } from "~/stores/usePlayerStore";
import { getRoute } from "~/utils/getRoute";
import { View } from "./components/view";

const DiscordLink = () => {
  const { publicKey } = useWallet();
  const self = usePlayerStore((state) => state.self);
  const endpoint = useCluster();

  const [done, setDone] = useState(self && !self.discordId);

  const updateSelf = usePlayerStore((state) => state.updateSelf);

  useEffect(() => {
    const parsedHash = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = parsedHash.get("access_token");

    if (!accessToken) {
      setDone(true);
    }

    const getUser = async () => {
      if (accessToken && publicKey) {
        const response = await getDiscordSelf(accessToken);

        if (response) {
          updateSelf(endpoint.cluster, publicKey.toString(), response.id);
        }
        setDone(true);
      }
    };
    getUser();
  }, [publicKey]);

  if (!done) {
    return <View />;
  }

  return <Redirect to={getRoute("/dashboard")} />;
};

export default DiscordLink;
