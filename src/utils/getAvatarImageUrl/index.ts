import { Avatar } from "~/types";

export const getAvatarImageUrl = (avatar?: Avatar) =>
  avatar ? `/images/avatars/${avatar}.jpeg` : undefined;
