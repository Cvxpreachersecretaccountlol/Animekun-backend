import express from "express";
import {
  mostFavorite,
  topAiring,
  underrated,
  mostPopular,
  spotlightAnimes,
  trendingAnimes,
  special,
  topTen,
  newsFeed
} from "../important/sections.js";

const GetHomepage = express.Router();

GetHomepage.get("/homepage", async (req, res) => {
  try {
    // Structure the response
    const response = {
      spotlightAnimes: spotlightAnimes.map(anime => ({
        rank: anime.rank,
        id: anime.id,
        name: anime.name,
        jname: anime.jname,
        description: anime.description,
        poster: anime.poster,
        type: anime.type,
        episodes: anime.episodes,
        otherInfo: anime.otherInfo
      })),

      trendingAnimes: trendingAnimes.map(anime => ({
        rank: anime.rank,
        id: anime.id,
        name: anime.name,
        jname: anime.jname,
        poster: anime.poster
      })),

      mostFavorite: mostFavorite.map(anime => ({
        id: anime.id,
        name: anime.name,
        jname: anime.jname,
        poster: anime.poster,
        duration: anime.duration,
        type: anime.type,
        rating: anime.rating,
        episodes: anime.episodes
      })),
      mostPopular: mostPopular.map(anime => ({
        id: anime.id,
        name: anime.name,
        jname: anime.jname,
        poster: anime.poster,
        duration: anime.duration,
        type: anime.type,
        rating: anime.rating,
        episodes: anime.episodes
      })),
      topAiring: topAiring.map(anime => ({
        id: anime.id,
        name: anime.name,
        jname: anime.jname,
        poster: anime.poster,
        duration: anime.duration,
        type: anime.type,
        rating: anime.rating,
        episodes: anime.episodes
      })),
      underrated: underrated.map(anime => ({
        id: anime.id,
        name: anime.name,
        jname: anime.jname,
        poster: anime.poster,
        duration: anime.duration,
        type: anime.type,
        rating: anime.rating,
        episodes: anime.episodes
      })),
      special: special.map(anime => ({
        id: anime.id,
        name: anime.name,
        jname: anime.jname,
        poster: anime.poster,
        duration: anime.duration,
        type: anime.type,
        rating: anime.rating,
        episodes: anime.episodes
      })),
      topTen: {
        t: topTen.t.map(a => ({
          id: a.id,
          rank: a.rank,
          name: a.name,
          jname: a.jname,
          poster: a.poster,
          episodes: a.episodes
        })),
        w: topTen.w.map(a => ({
          id: a.id,
          rank: a.rank,
          name: a.name,
          jname: a.jname,
          poster: a.poster,
          episodes: a.episodes
        })),
        m: topTen.m.map(a => ({
          id: a.id,
          rank: a.rank,
          name: a.name,
          jname: a.jname,
          poster: a.poster,
          episodes: a.episodes
        }))
      },
      newsFeed: newsFeed.map(n => ({
        id: n.id,
        title: n.title,
        date: n.uploadedAt,
        topics: n.topics,
        preview: n.preview,
        thumbnail: n.thumbnail,
        url: n.url
      }))
    };

    // Send the JSON response
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching or processing data:", error);
    res.status(500).json({ error: "Failed to fetch or process data" });
  }
});

export default GetHomepage;
