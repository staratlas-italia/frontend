export const getTier = (tier: 0 | 1 | 2) => {
  switch (tier) {
    case 0:
      return { name: "320$", cost: 320 };
    case 1:
      return { name: "500$", cost: 500 };
    case 2:
      return { name: "1000$", cost: 1000 };
    default:
      return { name: "NONE", cost: 0 };
  }
};
