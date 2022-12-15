import create from "zustand";
import { persist } from "zustand/middleware";

type AppStore = {
  showHueAnimation: boolean;
};

export const useAppStore = create(
  persist<AppStore>(
    () => ({
      showHueAnimation: true,
    }),
    {
      name: "app-storage",
    }
  )
);

export const useHueAnimation = () => useAppStore((s) => s.showHueAnimation);
