import express from "express";
import { HiAnime } from "aniwatch";
const GetAnimeInfo = express.Router();

const hianime = new HiAnime.Scraper();

GetAnimeInfo.get("/:animeId", async (req, res) => {

  try {
    const data = await hianime.getInfo(req.params.animeId);
    return res.status(200).send(data);
  } catch (err) {
    console.error("Error fetching data:", err);
    return res.status(500).send("Failed to fetch data.");
  }
});

export default GetAnimeInfo;
