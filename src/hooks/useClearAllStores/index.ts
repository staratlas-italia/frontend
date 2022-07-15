import { useCallback } from "react";
import { useAuthStore } from "~/stores/useAuthStore";
import { useBadgesStore } from "~/stores/useBadgesStore";
import { useFleetStore } from "~/stores/useFleetStore";
import { usePlayerStore } from "~/stores/usePlayerStore";

export const useClearAllStores = () => {
  const clearAuth = useAuthStore((s) => s.clear);
  const clearBadges = useBadgesStore((s) => s.clear);
  const clearFleet = useFleetStore((s) => s.clear);
  const clearSelf = usePlayerStore((s) => s.clear);

  return useCallback(() => {
    clearAuth();
    clearBadges();
    clearFleet();
    clearSelf();
  }, [clearAuth, clearBadges, clearFleet]);
};
