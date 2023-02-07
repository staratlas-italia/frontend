import { CheckCircleIcon } from "@heroicons/react/solid";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import Confetti from "react-dom-confetti";
import { useCluster } from "~/components/ClusterProvider";
import { Text } from "~/components/common/Text";
import { Flex } from "~/components/layout/Flex";
import { usePlayerStore } from "~/stores/usePlayerStore";

const confettiConfig = {
  angle: 90,
  spread: 100,
  startVelocity: 34,
  elementCount: 81,
  dragFriction: 0.11,
  duration: 3000,
  stagger: 3,
  width: "10px",
  height: "10px",
};

export const EasterEggDone = () => {
  const [active, setActive] = useState(false);

  const { cluster } = useCluster();
  const { publicKey } = useWallet();
  const { fetchSelf } = usePlayerStore();

  useEffect(() => {
    if (publicKey) {
      fetchSelf(cluster, publicKey.toString());
    }

    const timeout = setTimeout(() => {
      setActive(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, [cluster, fetchSelf, publicKey]);

  return (
    <Flex direction="col" align="center" p={3}>
      <CheckCircleIcon className="h-16 w-16 text-green-500" />

      <Flex pt={3}>
        <Text size="2xl" weight="semibold">
          You&apos;ve done it!
        </Text>
      </Flex>

      <Confetti active={active} config={confettiConfig} />

      <iframe
        width="100%"
        height="60%"
        src="https://www.youtube.com/embed/QH2-TGUlwu4?autoplay=1&start=5"
        title="Nyan cat"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </Flex>
  );
};
