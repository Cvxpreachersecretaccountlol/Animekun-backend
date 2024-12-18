import express from "express";
import { HiAnime } from "aniwatch";
const GetAnimeInfo = express.Router();

const hianime = new HiAnime.Scraper();

GetAnimeInfo.get("/:id", async (req, res) => {
  const animeId = req.params.id;

  try {
    const data = await hianime.getInfo(animeId);
    return res.status(200).send(data);
  } catch (err) {
    console.error("Error fetching data:", err);
    return res.status(500).send("Failed to fetch data.");
  }
});

export default GetAnimeInfo;
