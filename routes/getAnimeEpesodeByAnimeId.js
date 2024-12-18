import express from "express";
import { HiAnime } from "aniwatch";
const GetEpisodesByAnimeId = express.Router();

const hianime = new HiAnime.Scraper();

GetEpisodesByAnimeId.get("/:animeId", async (req, res) => {
  const animeId = req.params.animeId;

  try {
    const data = await hianime.getEpisodes(animeId);
    return res.status(200).send(data);
  } catch (err) {
    console.error("Error fetching data:", err);
    return res.status(500).send("Failed to fetch data.");
  }
});

export default GetEpisodesByAnimeId;