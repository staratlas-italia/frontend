import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";
import { usePlayerStore } from "~/stores/usePlayerStore";

export const usePlayer = () => {
  const { publicKey } = useWallet();

  const player = usePlayerStore((s) => s.current);
  const fetchPlayer = usePlayerStore((s) => s.fetchPlayer);

  useEffect(() => {
    fetchPlayer(publicKey?.toString() || "");
  }, [publicKey]);

  return {
    publicKey: publicKey?.toString() || "",
    player,
    loading: !player,
  };
};
