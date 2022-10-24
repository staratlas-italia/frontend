import { captureException } from "@sentry/nextjs";
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

    if (response.ok) {
      return response.json();
    }

    return null;
  } catch (e) {
    captureException(e);

    return null;
  }
};
