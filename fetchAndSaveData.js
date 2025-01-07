import fs from "fs/promises";
import { HiAnime } from "aniwatch";

const hianime = new HiAnime.Scraper();

export async function fetchAndSaveData() {
  const categories = ["most-favorite", "most-popular", "top-airing"];
  const sections = {};

  try {
    // Fetch data for each category
    for (const category of categories) {
      console.log(`Fetching data for category: ${category}`);
      const data = await hianime.getCategoryAnime(category, "1");

      if (data && Array.isArray(data.animes)) {
        sections[category] = data.animes.slice(0, 6); // Save only the first 6 objects
      } else {
        console.error(
          `Unexpected data format for category "${category}":`,
          data
        );
        sections[category] = []; // Fallback to an empty array
      }
    }

    // Check if underratedAnime.json exists before reading
    console.log("Checking if underratedAnime.json exists...");
    try {
      const underratedData = await fs.readFile("underratedAnime.json", "utf-8");
      const underratedAnimes = JSON.parse(underratedData).slice(0, 6);
      sections["underrated"] = underratedAnimes;
    } catch (readError) {
      console.error("Error reading underratedAnime.json:", readError);
      sections["underrated"] = []; // Fallback to an empty array
    }

    // Save updated sections to sections.json
    console.log("Saving data to sections.json...");
    await fs.writeFile("sections.json", JSON.stringify(sections, null, 2));
    console.log("Updated sections.json with all categories and underrated anime.");

    return sections; // Return sections object for further use
  } catch (err) {
    console.error("Error occurred:", err);
    throw err; // Rethrow the error after logging it
  }
}