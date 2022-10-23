import { DISCORD_API_URL } from "~/common/constants";
import { DiscordUser } from "~/types/api";

export const getDiscordSelf = async (
  token: string
): Promise<DiscordUser | null> => {
  try {
    const response = await fetch(`${DISCORD_API_URL}/users/@me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response && response.ok) {
      return (await response.json()) as DiscordUser;
    }

    return null;
  } catch (e) {
    return null;
  }
};
