import { formatTitleCase } from "../../src/utils/formatTitleCase";

describe("formatTitleCase", () => {
  it('should return the same string if it contains "-"', () => {
    const str = "hello-world";
    expect(formatTitleCase(str)).toEqual(str);
  });

  it("should return the same string if it contains uppercase letters", () => {
    const str = "HelloWorld";
    expect(formatTitleCase(str)).toEqual(str);
  });

  it("should capitalize the first letter of each word if the string is in lowercase", () => {
    const str = "hello world";
    expect(formatTitleCase(str)).toEqual("Hello World");
  });

  it("should handle string with punctuation marks", () => {
    const str = "hello, world!";
    expect(formatTitleCase(str)).toEqual("Hello, World!");
  });

  it("should handle empty string", () => {
    const str = "";
    expect(formatTitleCase(str)).toEqual("");
  });

  it("should handle string with only one word", () => {
    const str = "hello";
    expect(formatTitleCase(str)).toEqual("Hello");
  });
});
