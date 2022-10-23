import { DISCORD_API_URL } from "~/common/constants";
import { DiscordUser } from "~/types/api";

export const getDiscordUser = async (token: string): Promise<DiscordUser> => {
  const response = await fetch(`${DISCORD_API_URL}/users/@me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (await response.json()) as Promise<DiscordUser>;
};
