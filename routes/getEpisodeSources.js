import express from "express";
import { HiAnime } from "aniwatch";
const GetEpisodeSources = express.Router();

const hianime = new HiAnime.Scraper();

GetEpisodeSources.get("/:epid", async (req, res) => {
  const halfEp = req.params.epid;
  const server = req.query.s;
  const subOrDub = req.query.c;
  const secondHalfEp = req.query.ep;

  try {
    const data = await hianime.getEpisodeSources(
      `${halfEp}?ep=${secondHalfEp}`, server, subOrDub
      );
      
      console.log(data)
      
    return res.status(200).send(data);
  } catch (err) {
    console.error("Error fetching data:", err);
    return res.status(500).send("Failed to fetch data.");
  }
});

export default GetEpisodeSources;

// endcode before sending the ep id so it can't detect!! like this:
// encodeURIComponent()
