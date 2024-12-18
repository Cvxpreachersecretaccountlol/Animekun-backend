import express from "express";
import { HiAnime } from "aniwatch";
const GetAnimeByGenre = express.Router();

const hianime = new HiAnime.Scraper();

GetAnimeByGenre.get("/:genre", async (req, res) => {
  const genre = req.params.genre;
  const page = req.params.page || 1;

  try {
    const data = await hianime.getGenreAnime(genre, page);
    return res.status(200).send(data);
  } catch (err) {
    console.error("Error fetching data:", err);
    return res.status(500).send("Failed to fetch data.");
  }
});

export default GetAnimeByGenre;