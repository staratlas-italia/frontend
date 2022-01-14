import { useWallet } from "@solana/wallet-adapter-react";
import { useMemo } from "react";
import useSWR from "swr";
import { useShips } from "~/contexts/ShipsContext";
import { getShipsRates } from "~/network/score";
import {
  NormalizedScoreVarsShipInfo,
  NormalizedShipStakingInfo,
  StarAtlasEntity,
} from "~/types";
import { ScoreFleetResponse } from "~/types/api";
import { sortShipBySize } from "~/utils/sortShipBySize";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const fetcher2 = (mints: string) => getShipsRates(mints.split("|"));

type FleetData = {
  ship: StarAtlasEntity;
  stakeInfo: NormalizedShipStakingInfo;
  ratesInfo: NormalizedScoreVarsShipInfo;
};

export const usePlayerFleet = () => {
  const { ships, loading } = useShips();
  const { connected, publicKey } = useWallet();

  const { data: res, error } = useSWR<ScoreFleetResponse>(
    `/api/score/${publicKey?.toString()}`,
    fetcher
  );

  const fleetData = useMemo(() => {
    if (res?.success) {
      const mints = res.data.map((i) => i.shipMint);
      const fleetShips = ships.filter((item) => mints.includes(item.mint));

      return sortShipBySize(fleetShips).map((ship) => ({
        ship,
        stakeInfo: res?.data.find((item) => item.shipMint === ship.mint),
      }));
    }
    return [];
  }, [ships, res]);

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
