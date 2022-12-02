import create from "zustand";
import { persist } from "zustand/middleware";

type AppStore = {
  showHueAnimation: boolean;
};

export const useAppStore = create<AppStore>(
  persist(
    () => ({
      showHueAnimation: true,
    }),
    {
      name: "app-storage",
    }
  )
);

export const useHueAnimation = () => useAppStore((s) => s.showHueAnimation);
