import {
  CITIZENSHIP_DISCOUNT_PRICE,
  CITIZENSHIP_FULL_PRICE,
} from "~/common/constants";
import { useSelf } from "../useNullableSelf";

export const getCitizenshipPrice = (discordId?: string | null) =>
  discordId ? CITIZENSHIP_DISCOUNT_PRICE : CITIZENSHIP_FULL_PRICE;

export const useCitizenshipPrice = () => {
  const self = useSelf();

  return getCitizenshipPrice(self.discordId);
};
