import express from "express";
import { HiAnime } from "aniwatch";
const GetAnimeInfoUtils = express.Router();

const hianime = new HiAnime.Scraper();

GetAnimeInfoUtils.get("/homepage", async (req, res) => {

  try {
    const data = await hianime.getHomePage();
    return res.status(200).send(data);
  } catch (err) {
    console.error("Error fetching data:", err);
    return res.status(500).send("Failed to fetch data.");
  }
});

export default GetAnimeInfoUtils;
