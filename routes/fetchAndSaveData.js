import underratedAnimes from "../important/underrated.js";
import axios from "axios";
import {
  mostFavorite,
  topAiring,
  underrated,
  mostPopular,
  spotlightAnimes,
  trendingAnimes,
  topTen,
  special,
  newsFeed
} from "../important/sections.js";
import { HiAnime } from "aniwatch";
const newsApiUrl = "http://localhost:3000/api/mantox/get/news/feed";
const hianime = new HiAnime.Scraper();

export async function fetchAndSaveData() {
  const categories = ["most-favorite", "most-popular", "top-airing"];

  try {
    // Fetch data for each category
    for (const category of categories) {
      console.log(`Fetching data for category: ${category}`);
      const data = await hianime.getCategoryAnime(category, "1");

      if (data && Array.isArray(data.animes)) {
        const animeList = data.animes.slice(0, 8); // Get only the first 8 objects

        // Push data to the corresponding variable
        switch (category) {
          case "most-favorite":
            mostFavorite.length = 0; // Clear the array
            mostFavorite.push(...animeList); // Add new data
            break;
          case "most-popular":
            mostPopular.length = 0; // Clear the array
            mostPopular.push(...animeList); // Add new data
            break;
          case "top-airing":
            topAiring.length = 0; // Clear the array
            topAiring.push(...animeList); // Add new data
            break;
        }
        console.log(`Updated '${category}' with new data.`);
      } else {
        console.error(
          `Unexpected data format for category "${category}":`,
          data
        );
      }
    }

    const specialData = await hianime.getCategoryAnime("special", "1");
    const specialAnimeList = specialData.animes.slice(0, 24);
    if (specialData) {
      console.log("--> updating special animes");
      special.length = 0;
      special.push(...specialAnimeList); // Add new data
      console.log("--> Done updating specials");
    } else {
      console.log("error happened while updating special animes");
    }

    // Map and push the first 8 objects from underratedAnimes to the underrated variable
    const firstSixUnderratedAnimes = underratedAnimes
      .slice(0, 8)
      .map(anime => ({
        id: anime.id,
        name: anime.name,
        jname: anime.jname,
        poster: anime.poster,
        duration: anime.duration,
        type: anime.type,
        rating: anime.rating,
        episodes: anime.episodes
      }));

    underrated.length = 0; // Clear the array
    underrated.push(...firstSixUnderratedAnimes); // Add new data
    console.log("Successfully updated 'underrated' with new data.");

    const homepageData = await hianime.getHomePage();

    // Update spotlightAnimes with the full data from homepageData.spotlightAnimes
    if (homepageData.spotlightAnimes) {
      spotlightAnimes.length = 0; // Clear existing data
      spotlightAnimes.push(...homepageData.spotlightAnimes); // Push new data
      console.log("Successfully updated 'spotlightAnimes' with new data.");
      console.log("--> updating top 10");
      topTen.t.length = 0;
      topTen.w.length = 0;
      topTen.m.length = 0;

      topTen.t.push(...homepageData.top10Animes.today);
      topTen.w.push(...homepageData.top10Animes.week);
      topTen.m.push(...homepageData.top10Animes.month);
      console.log("--> Done updating top 10");
    } else {
      console.error(
        "No data found for 'spotlightAnimes' or 'top 10' in homepageData."
      );
    }

    console.log("--> getting news");
    const fullNewsFeed = await axios.get(newsApiUrl);
    const finalNewsFeed = fullNewsFeed.data.data.slice(0, 16) || [];
    newsFeed.length = 0;
    newsFeed.push(...finalNewsFeed);
    console.log("--> Updated news feed!");

    // Update trendingAnimes with the full data from homepageData.trendingAnimes
    if (homepageData.trendingAnimes) {
      trendingAnimes.length = 0; // Clear existing data
      trendingAnimes.push(...homepageData.trendingAnimes); // Push new data
      console.log("Successfully updated 'trendingAnimes' with new data.");
      console.log("DONE!!!");
    } else {
      console.error("No data found for 'trendingAnimes' in homepageData.");
    }
  } catch (err) {
    console.error("Error occurred:", err);
  }
}
