import create from "zustand";

type HueStore = {
  hue: number;
  updateHue: (newHue: number) => void;
};

export const useHueStore = create<HueStore>((set) => ({
  hue: 0,
  updateHue: (newHue: number) => {
    set({ hue: newHue });
  },
}));
