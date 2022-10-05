import { GrowthBook } from "@growthbook/growthbook-react";
import { growthbook as appGrowthbook } from "~/common/constants";

export const useSftPrice = () => getSftPrice();

export const getSftPrice = (growthbook?: GrowthBook) => {
  const changePriceISODateString = (
    growthbook ?? appGrowthbook
  ).getFeatureValue<string>("sai-frontend-price-change-date", "");

  const date = changePriceISODateString
    ? new Date(changePriceISODateString)
    : null;

  if (date) {
    if (new Date() > date) {
      return 20;
    }

    return 15;
  }

  return 20;
};
