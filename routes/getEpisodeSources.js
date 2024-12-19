import express from "express";
import { HiAnime } from "aniwatch";

const GetEpisodeSources = express.Router();

GetEpisodeSources.get("/:epid", async (req, res) => {
  const hianime = new HiAnime.Scraper(); // Fresh instance

  const halfEpid = req.params.epid;
  const secondHalfEpId = req.query.ep;

  const server = req.query.s || "hd-1";
  const subOrDub = req.query.c;

  const episodeId = `${halfEpid}?ep=${secondHalfEpId}`;

  try {
    const data = await hianime.getEpisodeSources(episodeId, server, subOrDub);
    return res.status(200).send(data);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Something went wrong!");
  }
});

export default GetEpisodeSources;
