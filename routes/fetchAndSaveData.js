import underratedAnimes from "../important/underrated.js";
import {
  mostFavorite,
  topAiring,
  underrated,
  mostPopular
} from "../important/sections.js";
import { HiAnime } from "aniwatch";

const hianime = new HiAnime.Scraper();

export async function fetchAndSaveData() {
  const categories = ["most-favorite", "most-popular", "top-airing"];

  try {
    // Fetch data for each category
    for (const category of categories) {
      console.log(`Fetching data for category: ${category}`);
      const data = await hianime.getCategoryAnime(category, "1");

      if (data && Array.isArray(data.animes)) {
        const animeList = data.animes.slice(0, 6); // Save only the first 6 objects

        // Push data to the corresponding variable
        switch (category) {
          case "most-favorite":
            mostFavorite.push(...animeList);
            break;
          case "most-popular":
            mostPopular.push(...animeList);
            break;
          case "top-airing":
            topAiring.push(...animeList);
            break;
        }
        console.log("pushed to objects");
      } else {
        console.error(
          `Unexpected data format for category "${category}":`,
          data
        );
      }
    }

    // Map and push the first 6 objects from underratedAnimes to the underrated variable
    const firstSixUnderratedAnimes = underratedAnimes.slice(0, 6).map((anime) => ({
      id: anime.id,
      name: anime.name,
      jname: anime.jname,
      poster: anime.poster,
      duration: anime.duration,
      type: anime.type,
      rating: anime.rating,
      episodes: anime.episodes
    }));

    underrated.push(...firstSixUnderratedAnimes);

    console.log("Successfully mapped and pushed the first 6 objects to 'underrated'.");

  } catch (err) {
    console.error("Error occurred:", err);
  }
}