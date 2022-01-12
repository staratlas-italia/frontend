import { useWallet } from "@solana/wallet-adapter-react";
import { useMemo } from "react";
import useSWR from "swr";
import { useShips } from "~/contexts/ShipsContext";
import { ScoreFleetResponse } from "~/types/api";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const usePlayerFleet = () => {
  const { connected, publicKey } = useWallet();

  const { ships, loading } = useShips();

  const { data: res, error } = useSWR<ScoreFleetResponse>(
    `/api/score/${publicKey?.toString()}`,
    fetcher
  );

  const fleetData = useMemo(
    () =>
      res?.success
        ? res?.data.map((shipInfo) => ({
            shipInfo,
            ship: ships.find((item) => item.mint === shipInfo.shipMint),
          }))
        : [],
    [ships, res]
  );

  if (loading || (!res && !error)) {
    return {
      loading: true,
      fleet: [],
    };
  }

  if (!connected || !publicKey) {
    return {
      loading: false,
      fleet: [],
    };
  }

  return {
    loading: false,
    fleet: fleetData,
  };
};
