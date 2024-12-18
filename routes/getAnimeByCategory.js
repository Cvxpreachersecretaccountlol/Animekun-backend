import express from "express";
import { HiAnime } from "aniwatch";
const AnimeByCategoryRouter = express.Router();

const hianime = new HiAnime.Scraper();

AnimeByCategoryRouter.get("/:category", async (req, res) => {
  const category = req.params.category;

  try {
    const data = await hianime.getCategoryAnime(category);
    return res.status(200).send(data);
  } catch (err) {
    console.error("Error fetching data:", err);
    return res.status(500).send("Failed to fetch data.");
  }
});

export default AnimeByCategoryRouter;

// categories ->
// "most-favorite", "most-popular", "subbed-anime", "dubbed-anime",
// "recently-updated", "recently-added", "top-upcoming", "top-airing",
// "movie", "special", "ova", "ona
