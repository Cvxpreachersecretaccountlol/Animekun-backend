import express from "express";
import { HiAnime } from "aniwatch";
import { fork } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GetEpisodeSources = express.Router();

GetEpisodeSources.get("/:epid", async (req, res) => {
  const child = fork(path.join(__dirname, "scraper.js")); // Run scraper in a separate process

  const params = {
    epid: req.params.epid,
    query: req.query,
  };

  child.send(params);

  child.on("message", (data) => {
    res.status(200).send(data);
  });

  child.on("error", (err) => {
    res.status(500).send("Failed to fetch data.");
  });

  child.on("exit", (code) => {
    if (code !== 0) {
      console.error(`Child process exited with code ${code}`);
    }
  });
});

export default GetEpisodeSources;
