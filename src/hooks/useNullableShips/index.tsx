import { useEffect } from "react";
import useSWR from "swr";
import { useShipContext } from "~/contexts/ShipsContext";
import { api } from "~/network/api";
import { StarAtlasEntity } from "~/types";
import { getApiRoute } from "~/utils/getRoute";

const fetcher = (url: string) => api.get<StarAtlasEntity[]>(url);

export const useNullableShips = () => {
  const { update } = useShipContext();

  const { data, error } = useSWR<StarAtlasEntity[] | undefined>(
    getApiRoute("/api/ships"),
    fetcher
  );

  useEffect(() => {
    if (data?.length) {
      update(data);
    }
  }, [data]);

  return {
    data,
    error,
    loading: !data && !error,
  };
};
