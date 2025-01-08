import express from "express";
import axios from "axios";

const Homepage = express.Router();
const url =
  "https://unfortunate-darlene-animekun-discord-bot-f0aebe99.koyeb.app/api/mantox/get/sections";

Homepage.get("/homepage", async (req, res) => {
  try {
    // Fetching data from the URL
    const response = await axios.get(url);
    // Sending the fetched data as a response
    res.status(200).json(response.data);
  } catch (error) {
    // Handling errors
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

export default Homepage;