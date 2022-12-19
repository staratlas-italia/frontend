import { captureException } from "@sentry/nextjs";
import { DISCORD_API_URL } from "~/common/constants";
import { createApiClient } from "~/network/api";
import { DiscordUser } from "~/types/api";

const discordClient = createApiClient(DISCORD_API_URL);

export const getDiscordSelf = async (token: string) => {
  try {
    const user = await discordClient.get<DiscordUser | null>("/users/@me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return user;
  } catch (e) {
    captureException(e);

    return null;
  }
};
