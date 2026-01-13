import express from "express";
import { HiAnime } from "aniwatch";
const GetSearchSuggestion = express.Router();

const hianime = new HiAnime.Scraper();

GetSearchSuggestion.get("/", async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).send("Query parameter 'q' is required.");
  }

  try {
    const data = await hianime.searchSuggestions(query);
    return res.status(200).send(data);
  } catch (err) {
    console.error("Error fetching data:", err);
    return res.status(500).send("Failed to fetch data.");
  }
});

export default GetSearchSuggestion;