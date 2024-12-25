import express from "express";
import { HiAnime } from "aniwatch";
const GetAnimeByProducer = express.Router();

const hianime = new HiAnime.Scraper();

GetAnimeByProducer.get("/:producer", async (req, res) => {
  const producer = req.params.producer;
  const page = req.query.page || 1;

  try {
    const data = await hianime.getProducerAnimes(producer, page);
    return res.status(200).send(data);
  } catch (err) {
    console.error("Error fetching data:", err);
    return res.status(500).send("Failed to fetch data.");
  }
});

export default GetAnimeByProducer;
