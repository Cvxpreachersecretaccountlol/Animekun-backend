import express from "express";
import cors from "cors";

import { fetchAndSaveData } from "./routes/fetchAndSaveData.js";

// Routers
import SearchRouter from "./routes/searchAnime.js";
import GetAnimeInfo from "./routes/getAnimeInfo.js";
import AnimeByCategoryRouter from "./routes/getAnimeByCategory.js";
import GetAnimeByGenre from "./routes/getAnimeByGenre.js";
import GetAnimeInfoUtils from "./routes/getAnimeInfoUtils.js";
import GetSearchSuggestion from "./routes/getSearchSuggestion.js";
import GetAnimeByProducer from "./routes/getAnimesByProducers.js";
import GetAnimeEstimetedSchedule from "./routes/getAnimeEstimatedSchedule.js";
import GetEpisodesByAnimeId from "./routes/getAnimeEpesodeByAnimeId.js";
import GetEpisodeServers from "./routes/getEpisodeServers.js";
import GetEpisodeSources from "./routes/getEpisodeSources.js";
import GetSections from "./routes/getSections.js";
import Homepage from "./routes/custom.js";

const app = express();

// CORS configuration
const allowedDomains = [
  "http://localhost:5173",
  "http://localhost:6700",
  "https://animekun.lol",
  "https://anime-kun-frontend-manto999s-projects.vercel.app",
  "http://192.168.174.85:5173",
  "https://animekun-frontend.pages.dev"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedDomains.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Access forbidden: domain not allowed"));
      }
    },
    methods: "GET",
    allowedHeaders: "Content-Type, Authorization"
  })
);

let date = "Not updated yet";

// Function to format date in "Month Day, Year. HH:MM AM/PM" format in IST
const formatDate = date => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata" // Set to IST
  };
  return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
};

// Function to fetch data and update the date
const updateData = async () => {
  try {
    await fetchAndSaveData();
    date = formatDate(new Date()); // Update date with formatted string in IST
  } catch (error) {
    console.error("Error fetching and saving data:", error);
  }
};

// Initial fetch and schedule subsequent fetches every 8 hours
updateData();
setInterval(updateData, 8 * 60 * 60 * 1000); // 8 hours in milliseconds

// API Routes
app.get("/", (req, res) => {
  res.json({
    message: "API is running successfully!",
    lastSectionUpdate: date
  });
});

app.use("/api/mantox/search", SearchRouter);
app.use("/api/mantox/anime/info", GetAnimeInfo);
app.use("/api/mantox/catagory", AnimeByCategoryRouter);
app.use("/api/mantox/anime/genre", GetAnimeByGenre);
app.use("/api/mantox/animeinfo", GetAnimeInfoUtils);
app.use("/api/mantox/searchsuggestion", GetSearchSuggestion);
app.use("/api/mantox/producer", GetAnimeByProducer);
app.use("/api/mantox/schedule", GetAnimeEstimetedSchedule);
app.use("/api/mantox/episodes", GetEpisodesByAnimeId);
app.use("/api/mantox/episode/servers", GetEpisodeServers);
app.use("/api/mantox/episode/sources", GetEpisodeSources);
app.use("/api/mantox/get", GetSections);
app.use("/api/mantox/get", Homepage);

// Start server yeaaa
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running! PORT: ${PORT}`);
});
