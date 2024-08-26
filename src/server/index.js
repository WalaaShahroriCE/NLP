const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

const meaningCloudAPIURL = "https://api.meaningcloud.com/sentiment-2.1";

app.get("/", (req, res) => {
  res.sendFile("dist/index.html");
});

app.get("/api", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  const apiKey = process.env.API_KEY;
  const apiUrl = `${meaningCloudAPIURL}?key=${apiKey}&url=${encodeURIComponent(
    url
  )}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to process the request" });
  }
});

app.listen(8000, () => {
  console.log("Server listening on port 8000!");
});
