import { GrowthBook } from "@growthbook/growthbook-react";
import { getSftPrice } from "..";

const growthbook = new GrowthBook();

afterEach(() => {
  growthbook.setFeatures({});
});

describe("toTuple", () => {
  it("returns a price of 20 if no date is specified", () => {
    growthbook.setFeatures({
      "sai-frontend-price-change-date": {
        defaultValue: "",
      },
    });

    expect(getSftPrice(growthbook)).toBe(20);
  });

  it("returns a price of 15 if the current date is before the sai-frontend-price-change-date", () => {
    growthbook.setFeatures({
      "sai-frontend-price-change-date": {
        defaultValue: new Date(new Date().getTime() + 86_400_000).toISOString(),
      },
    });

    expect(getSftPrice(growthbook)).toBe(15);
  });

  it("returns a price of 20 if the current date is after the sai-frontend-price-change-date", () => {
    growthbook.setFeatures({
      "sai-frontend-price-change-date": {
        defaultValue: new Date(new Date().getTime() - 86_400_000).toISOString(),
      },
    });

    expect(getSftPrice(growthbook)).toBe(20);
  });
});
