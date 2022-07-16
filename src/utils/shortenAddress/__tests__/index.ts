import { shortenAddress } from "..";

describe("shortenAddress", () => {
  it("return a three dot string if the string is empty", () => {
    expect(shortenAddress("")).toBe("...");
  });

  it("returns the string repetition if the string has 4 or less chars ", () => {
    expect(shortenAddress("abc")).toBe("abc...abc");
  });

  it("returns the first n chars and the last n chars separeted by 3 dots", () => {
    expect(shortenAddress("abcdefgh", 2)).toBe("ab...gh");
  });
});
