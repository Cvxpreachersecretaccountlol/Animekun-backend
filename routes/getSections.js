import express from "express";
import axios from "axios";

const GetSections = express.Router();

GetSections.get("/sections", async (req, res) => {
  try {
    // Fetch data from the provided link
    const response = await axios.get("https://animekun-gg.subhajeetchowdhury954.workers.dev/get-homepage-section");
    const data = response.data;

    if (!data || !data.results) {
      return res.status(500).json({ error: "Invalid data format from API" });
    }

    // Structure the data
    const structuredData = {};

    // Loop through the results and organize data into categories
    data.results.forEach((item) => {
      const category = item.category;

      // Parse episodes field to JSON
      const episodes = item.episodes ? JSON.parse(item.episodes) : { sub: 0, dub: 0 };

      // Ensure the category exists in the structuredData object
      if (!structuredData[category]) {
        structuredData[category] = [];
      }

      // Push the formatted item into the appropriate category
      structuredData[category].push({
        id: item.id,
        name: item.name,
        jname: item.jname,
        poster: item.poster,
        duration: item.duration,
        type: item.type,
        rating: item.rating,
        episodes: episodes,
      });
    });

    // Send the structured JSON response
    res.json(structuredData);
  } catch (error) {
    console.error("Error fetching or processing data:", error);
    res.status(500).json({ error: "Failed to fetch or process data" });
  }
});

export default GetSections;