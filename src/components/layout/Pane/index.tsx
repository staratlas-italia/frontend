const baseColors = ["transparent", "current", "black", "white"] as const;

const colors = [
  "gray",
  "red",
  "yellow",
  "emerald",
  "blue",
  "indigo",
  "purple",
  "pink",
] as const;

const colorShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

export type ColorName =
  | typeof baseColors[number]
  | `${typeof colors[number]}-${typeof colorShades[number]}`;

export type BgColorName = `bg-${ColorName}`;
