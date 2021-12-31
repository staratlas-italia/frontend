import { Avatar } from "~/types";

export const getAvatarImageUrl = (avatar: Avatar) =>
  `/images/avatars/${avatar}.jpeg`;
