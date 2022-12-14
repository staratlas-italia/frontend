import create from "zustand";
import { persist } from "zustand/middleware";

type AppStore = {
  showHueAnimation: boolean;
  lastConnectedWallet: string | null;
};

export const useAppStore = create(
  persist<AppStore>(
    () => ({
      showHueAnimation: true,
      lastConnectedWallet: null,
    }),
    {
      name: "app-storage",
    }
  )
);

export const useHueAnimation = () => useAppStore((s) => s.showHueAnimation);
