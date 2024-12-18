import express from "express";
import { HiAnime } from "aniwatch";
const GetEpisodeServers = express.Router();

const hianime = new HiAnime.Scraper();

GetEpisodeServers.get("/:epid", async (req, res) => {
  const halfEpisodeId = req.params.epid;
  const secondHalfEp = req.query.ep;

  try {
    const data = await hianime.getEpisodeServers(
      `${halfEpisodeId}?ep=${secondHalfEp}`
    );
    return res.status(200).send(data);
  } catch (err) {
    console.error("Error fetching data:", err);
    return res.status(500).send("Failed to fetch data.");
  }
});

export default GetEpisodeServers;