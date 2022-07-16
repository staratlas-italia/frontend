import { Self } from "~/types/api";
import { appendQueryParams } from "~/utils/appendQueryParams";
import { getApiRoute } from "~/utils/getRoute";

const buildDefaultSelf = (publicKey: string) => ({
  discordId: null,
  wallets: [publicKey],
  notifications: false,
  players: [],
});

export const fetchSelf = async (publicKey: string): Promise<Self | null> => {
  try {
    const res = await fetch(
      appendQueryParams(getApiRoute("/api/self"), { publicKey })
    );
    const response = await res.json();

    if (response.success) {
      return response.user;
    }

    return buildDefaultSelf(publicKey);
  } catch (e) {
    return buildDefaultSelf(publicKey);
  }
};
