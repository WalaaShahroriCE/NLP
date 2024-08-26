import { checkForURL } from "./nameChecker";

const serverURL = "http://localhost:8000/api";

const form = document.getElementById("urlForm");
form.addEventListener("submit", handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();

  const formText = document.getElementById("name").value;

  if (checkForURL(formText)) {
    try {
      const response = await fetch(
        `${serverURL}?url=${encodeURIComponent(formText)}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      displayResults(data);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while processing your request.");
    }
  } else {
    alert("Enter a valid URL");
  }
}

function displayResults(data) {
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  // Extract the necessary fields from the response
  const polarity = data.score_tag; // Overall sentiment score
  const subjectivity = data.subjectivity; // Subjectivity
  const text = data.text; // Full text from the response

  // Display the extracted information
  const polarityElement = document.createElement("p");
  polarityElement.textContent = `Polarity: ${polarity}`;

  const subjectivityElement = document.createElement("p");
  subjectivityElement.textContent = `Subjectivity: ${subjectivity}`;

  const textElement = document.createElement("p");
  textElement.textContent = `Text: ${text}`;

  resultsContainer.appendChild(polarityElement);
  resultsContainer.appendChild(subjectivityElement);
  resultsContainer.appendChild(textElement);
}

export { handleSubmit };
