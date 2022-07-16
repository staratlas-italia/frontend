import { toTuple } from "..";

describe("toTuple", () => {
  it("behaves as an identity function with one element in the array", () => {
    expect(toTuple([1])).toEqual([1]);
  });

  it("behaves as an identity function with many elements in the array", () => {
    expect(toTuple([1, 2, 3])).toEqual([1, 2, 3]);
  });
});
