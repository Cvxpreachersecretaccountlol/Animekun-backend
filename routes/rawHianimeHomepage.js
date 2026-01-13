import express from "express";
import { HiAnime } from "aniwatch";
const RawHianimeHomepage = express.Router();

const hianime = new HiAnime.Scraper();

RawHianimeHomepage.get("/homepage", async (req, res) => {
  try {
    const data = await hianime.getHomePage();
    return res.status(200).send(data);
  } catch (err) {
    console.error("Error fetching data:", err);
    return res.status(500).send("Failed to fetch data.");
  }
});

export default RawHianimeHomepage;
