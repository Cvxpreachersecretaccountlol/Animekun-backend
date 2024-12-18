import express from "express";
import { HiAnime } from "aniwatch";
const GetAnimeEstimetedSchedule = express.Router();

const hianime = new HiAnime.Scraper();

GetAnimeEstimetedSchedule.get("/:date", async (req, res) => {
  const date = req.params.date;
  // date (yyyy-mm-dd)
  try {
    const data = await hianime.getEstimatedSchedule(date);
    return res.status(200).send(data);
  } catch (err) {
    console.error("Error fetching data:", err);
    return res.status(500).send("Failed to fetch data.");
  }
});

export default GetAnimeEstimetedSchedule;
