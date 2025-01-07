import express from "express";
import {
  mostFavorite,
  topAiring,
  underrated,
  mostPopular
} from "../important/sections.js";

const GetSections = express.Router();

GetSections.get("/sections", async (req, res) => {
  try {
    // Structure the response
    const response = {
      "mostFavorite": mostFavorite.map(anime => ({
        id: anime.id,
        name: anime.name,
        jname: anime.jname,
        poster: anime.poster,
        duration: anime.duration,
        type: anime.type,
        rating: anime.rating,
        episodes: anime.episodes
      })),
      "mostPopular": mostPopular.map(anime => ({
        id: anime.id,
        name: anime.name,
        jname: anime.jname,
        poster: anime.poster,
        duration: anime.duration,
        type: anime.type,
        rating: anime.rating,
        episodes: anime.episodes
      })),
      "topAiring": topAiring.map(anime => ({
        id: anime.id,
        name: anime.name,
        jname: anime.jname,
        poster: anime.poster,
        duration: anime.duration,
        type: anime.type,
        rating: anime.rating,
        episodes: anime.episodes
      })),
      "underrated": underrated.map(anime => ({
        id: anime.id,
        name: anime.name,
        jname: anime.jname,
        poster: anime.poster,
        duration: anime.duration,
        type: anime.type,
        rating: anime.rating,
        episodes: anime.episodes
      }))
    };

    // Send the JSON response
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching or processing data:", error);
    res.status(500).json({ error: "Failed to fetch or process data" });
  }
});

export default GetSections;
