import express from "express";
import { HiAnime } from "aniwatch";
const GetEpisodeServers = express.Router();

const hianime = new HiAnime.Scraper();

GetEpisodeServers.get("/:epid", async (req, res) => {
  const encodedParam = req.params.epid;
  const episodeId = decodeURIComponent(encodedParam);
  
  console.log(episodeId)

  try {
    const data = await hianime.getEpisodeServers(episodeId);
    return res.status(200).send(data);
  } catch (err) {
    console.error("Error fetching data:", err);
    return res.status(500).send("Failed to fetch data.");
  }
});

export default GetEpisodeServers;


// endcode before sending the ep id so it can't detect!! like this:
// encodeURIComponent()