import { GrowthBook } from "@growthbook/growthbook-react";
import { growthbook as appGrowthbook } from "~/common/constants";

export const useSftPrice = () => getSftPrice();

export const getSftPrice = (growthbook?: GrowthBook, discoutAmout?: number) => {
  let defaultPrice = 20;

  if (discoutAmout) {
    defaultPrice -= discoutAmout;
  }

  const changePriceISODateString = (
    growthbook ?? appGrowthbook
  ).getFeatureValue<string>("sai-frontend-price-change-date", "");

  const date = changePriceISODateString
    ? new Date(changePriceISODateString)
    : null;

  if (date) {
    if (new Date() > date) {
      return defaultPrice;
    }

    return 15;
  }

  return defaultPrice;
};

export const getDiscoutAmount = (discordId?: string | null): number => {
  return discordId ? 5 : 0;
};
