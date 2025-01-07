import { HiAnime } from "aniwatch";
import axios from "axios"; // Importing axios

const hianime = new HiAnime.Scraper();
const apiUrl = "https://animekun-gg.subhajeetchowdhury954.workers.dev";
const headers = {
  "Content-Type": "application/json"
};

export async function fetchAndSaveData() {
  const categories = ["most-favorite", "most-popular", "top-airing"];
  const sections = [];

  try {
    // Send DELETE request to clear existing homepage sections data
    console.log("Deleting homepage data and adding new...");
    await axios.delete(`${apiUrl}/delete-all-homepage-sections`, { headers });

    console.log("Deleted");

    // Fetch data for each category
    for (const category of categories) {
      console.log(`Fetching data for category: ${category}`);
      const data = await hianime.getCategoryAnime(category, "1");

      if (data && Array.isArray(data.animes)) {
        const categoryData = data.animes.slice(0, 6).map(anime => ({
          category: category,
          id: anime.id,
          name: anime.name,
          jname: anime.jname || anime.name, // Use the original name if Japanese name is unavailable
          poster: anime.poster,
          duration: anime.duration || "Unknown", // Fallback if duration is missing
          type: anime.type || "Unknown", // Fallback if type is missing
          rating: anime.rating || null, // Fallback to null if rating is unavailable
          episodes: {
            sub: anime.episodes?.sub || 0, // Fallback to 0 if sub episodes are missing
            dub: anime.episodes?.dub || 0 // Fallback to 0 if dub episodes are missing
          }
        }));

        sections.push(...categoryData);
      } else {
        console.error(
          `Unexpected data format for category "${category}":`,
          data
        );
      }
    }

    // Fetch underrated anime data
    console.log("Fetching underrated anime data...");
    const underratedResponse = await axios.get(`${apiUrl}/get-animes`);
    const underratedData = underratedResponse.data;
    const underratedAnimes = underratedData.slice(0, 6).map(anime => ({
      category: "underrated",
      id: anime.id,
      name: anime.name,
      jname: anime.jname || anime.name,
      poster: anime.poster,
      duration: anime.duration || "Unknown",
      type: anime.type || "Unknown",
      rating: anime.rating || null,
      episodes: {
        sub: anime.episodes?.sub || 0,
        dub: anime.episodes?.dub || 0
      }
    }));

    sections.push(...underratedAnimes);

    // POST each anime data as an individual body object
    console.log("Posting data to remote API...");
    for (const anime of sections) {
      try {
        // Post each anime one by one
        const postResponse = await axios.post(
          `${apiUrl}/add-homepage-sections`,
          anime,
          {
            headers: headers
          }
        );
        console.log(
          `Data for ${anime.name} successfully posted to remote API:`,
          postResponse.data
        );
      } catch (error) {
        console.error(
          `Error posting data for ${anime.name}:`,
          error.response ? error.response.data : error.message
        );
      }
    }
  } catch (err) {
    console.error("Error occurred:", err);
  }
}
