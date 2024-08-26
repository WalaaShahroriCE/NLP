import { handleSubmit } from "../src/client/js/formHandler";
import { checkForURL } from "../src/client/js/nameChecker";

jest.mock("../src/client/js/nameChecker", () => ({
  checkForURL: jest.fn(),
}));

describe("Testing the submit functionality", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    document.body.innerHTML = `
      <form id="urlForm">
        <input id="name" type="text" value="http://example.com">
        <button id="submitButton" type="submit">Submit</button>
      </form>
      <div id="results"></div>
    `;
  });

  test("should call checkForURL with the correct URL and handle valid URL", async () => {
    const mockURL = "http://example.com";
    const mockResponse = {
      score_tag: "P",
      subjectivity: "subjective",
      text: "Sample text",
    };

    checkForURL.mockReturnValue(true);

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })
    );

    global.alert = jest.fn();

    const form = document.getElementById("urlForm");
    form.addEventListener("submit", handleSubmit);

    await form.dispatchEvent(new Event("submit", { bubbles: true }));

    expect(checkForURL).toHaveBeenCalledWith(mockURL);
    const resultsContainer = document.getElementById("results");
    expect(resultsContainer).toBeTruthy();
    expect(resultsContainer.innerHTML).toContain("Polarity: P");
    expect(resultsContainer.innerHTML).toContain("Subjectivity: subjective");
    expect(resultsContainer.innerHTML).toContain("Text: Sample text");
  });

  test("should handle fetch errors gracefully", async () => {
    checkForURL.mockReturnValue(true);

    global.fetch = jest.fn(() => Promise.reject(new Error("Fetch error")));

    global.alert = jest.fn();

    const form = document.getElementById("urlForm");
    form.addEventListener("submit", handleSubmit);

    await form.dispatchEvent(new Event("submit", { bubbles: true }));

    expect(global.alert).toHaveBeenCalledWith(
      "An error occurred while processing your request."
    );
  });

  test("should show an alert for invalid URL", async () => {
    checkForURL.mockReturnValue(false);

    global.alert = jest.fn();

    const form = document.getElementById("urlForm");
    form.addEventListener("submit", handleSubmit);

    await form.dispatchEvent(new Event("submit", { bubbles: true }));

    expect(global.alert).toHaveBeenCalledWith("Enter a valid URL");
  });
});
