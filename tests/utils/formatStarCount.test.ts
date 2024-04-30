import { formatStarCount } from "../../src/utils/formatStarCount";

describe("formatStarCount", () => {
  it("should return count as string if less than 1000", () => {
    expect(formatStarCount(500)).toEqual("500");
    expect(formatStarCount(999)).toEqual("999");
  });

  it("should return count in K format if greater than or equal to 1000", () => {
    expect(formatStarCount(1000)).toEqual("1 K");
    expect(formatStarCount(1500)).toEqual("1 K");
    expect(formatStarCount(2000)).toEqual("2 K");
    expect(formatStarCount(9999)).toEqual("9 K");
    expect(formatStarCount(10000)).toEqual("10 K");
    expect(formatStarCount(15000)).toEqual("15 K");
  });
});
