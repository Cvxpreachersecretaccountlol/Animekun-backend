import express from "express";
import axios from "axios";
import { load } from "cheerio";

const NewsRouter = express.Router();
const BASE_URL = "https://www.animenewsnetwork.com";

/**
 * Fetch the latest news feed from Anime News Network
 * Optional query param: ?topic=anime
 */
const fetchNewsFeeds = async topic => {
  try {
    const url = topic ? `${BASE_URL}/news/?topic=${topic}` : `${BASE_URL}/news`;
    const { data } = await axios.get(url);
    const $ = load(data);
    const feeds = [];

    $(".herald.box.news").each((i, el) => {
      const title = $(el).find("h3").text().trim();
      const slug = $(el).find("h3 > a").attr("href") || "";
      const url = `${BASE_URL}${slug}`;
      const byline = $(el).find(".byline");
      const uploadedAt = byline.find("time").text().trim();
      const topics = [];

      byline.find(".topics > a").each((i, el) => {
        topics.push($(el).text().trim());
      });

      const El = $(el).find(".preview");
      const preview = {
        intro: El.find(".intro").text().trim(),
        full: El.find(".full").text().replace("―", "").trim()
      };

      const thumbnailSlug = $(el).find(".thumbnail").attr("data-src");
      const thumbnail = thumbnailSlug
        ? `${BASE_URL}${thumbnailSlug}`
        : "https://i.imgur.com/KkkVr1g.png";

      feeds.push({
        id: slug.replace("/news/", ""),
        title,
        uploadedAt,
        topics,
        preview,
        thumbnail,
        url
      });
    });

    return feeds;
  } catch (error) {
    throw new Error("Error fetching news feeds: " + error.message);
  }
};

/**
 * GET /news
 * Fetches the latest Anime News Network news articles
 */
NewsRouter.get("/news", async (req, res) => {
  try {
    const topic = req.query.topic || "";
    const newsFeeds = await fetchNewsFeeds(topic);
    res.json(newsFeeds);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default NewsRouter;
