import { checkForURL } from "../src/client/js/nameChecker";

describe("Testing the checkForURL function", () => {
  test("should return true for valid URLs", () => {
    const validURLs = [
      "http://example.com",
      "https://example.com",
      "http://www.example.com",
      "https://www.example.com",
      "http://example.com/path/to/resource",
      "https://example.com/path/to/resource",
      "http://example.com:8080",
    ];

    validURLs.forEach((url) => {
      expect(checkForURL(url)).toBe(true);
    });
  });

  test("should return false for invalid URLs", () => {
    const invalidURLs = [
      "example.com",
      "http://",
      "https://",
      "ftp://example.com",
      "http:// example.com",
      "http://example.com:abc",
    ];

    invalidURLs.forEach((url) => {
      expect(checkForURL(url)).toBe(false);
    });
  });
});
