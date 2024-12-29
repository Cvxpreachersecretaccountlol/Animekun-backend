import express from "express";
import { HiAnime } from "aniwatch";
const SearchRouter = express.Router();

const hianime = new HiAnime.Scraper();

SearchRouter.get("/", async (req, res) => {
  const searchQuery = req.query.q;
  const page = req.query.page || 1;
  const sort = req.query.sort;
  const lang = req.query.lang;
  const status = req.query.status;
  const type = req.query.type;
  const rated = req.query.rated;
  const score = req.query.score;
  const season = req.query.season;
  const startDate = req.query.start_date;
  const endDate = req.query.end_date;

  const genresParams = req.query.genres;
  const genres = genresParams ? genresParams.replace(/\+/g, ",") : null;

  try {
    const data = await hianime.search(`${searchQuery}`, page, {
      sort: sort,
      language: lang,
      status: status,
      type: type,
      rated: rated,
      season: season,
      start_date: startDate,
      end_date: endDate,
      genres: genres
    });
    return res.status(200).send(data);
  } catch (err) {
    console.error("Error fetching data:", err);
    return res.status(500).send("Failed to fetch data.");
  }
});

export default SearchRouter;
