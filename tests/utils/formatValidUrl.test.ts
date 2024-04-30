import { formatValidUrl } from "../../src/utils/formatValidUrl";

describe("formatValidUrl", () => {
  it("should return true for valid GitHub repository URLs", () => {
    const validUrls = [
      "https://github.com/username/repo-name",
      "https://github.com/username-with-dash/repo-name-with-dash",
      "https://github.com/user123/repo123",
    ];
    validUrls.forEach((url) => {
      expect(formatValidUrl(url)).toBe(true);
    });
  });

  it("should return false for invalid GitHub repository URLs", () => {
    const invalidUrls = [
      "https://github.com/username",
      "https://github.com/username/repo-name/with-extra-segment",
      "https://github.com/username/repo-name/",
      "https://github.com/repo-name",
      "https://github.com/",
      "https://github.com",
      "https://example.com",
      "ftp://github.com/username/repo-name",
    ];
    invalidUrls.forEach((url) => {
      expect(formatValidUrl(url)).toBe(false);
    });
  });
});
