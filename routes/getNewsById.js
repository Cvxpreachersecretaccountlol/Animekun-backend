import express from "express";
import axios from "axios";
import { load } from "cheerio";

const NewsById = express.Router();
const BASE_URL = "https://www.animenewsnetwork.com";

/**
 * Scrape news article details from Anime News Network
 * @param {string} url - The full URL of the news article
 */
const scrapeNewsInfo = async url => {
  try {
    const { data } = await axios.get(url);
    const $ = load(data);
    //console.log($);

    const title = $("#page_header").text().replace("News", "").trim();
    const intro = $(".intro").first().text().trim();
    const description = $(".meat > p").text().trim().split("\n\n").join("\n");
    const uploadedAt = $("#page-title > small > time").text().trim();
    const thumbnailSlug = $(".meat > figure.fright")
      .first()
      .find("img")
      .attr("data-src");

    return {
      id: url.split("news/")[1],
      title,
      uploadedAt,
      intro,
      description,
      thumbnail: thumbnailSlug
        ? `${BASE_URL}${thumbnailSlug}`
        : "https://i.imgur.com/KkkVr1g.png",
      url
    };
  } catch (error) {
    throw new Error("Error fetching news info: " + error.message);
  }
};

/**
 * GET /news/:id
 * Fetches detailed information about a specific news article
 */
NewsById.get("/info", async (req, res) => {
  try {
    const newsId = req.query.id;
    console.log("id:", newsId);
    const newsInfo = await scrapeNewsInfo(`${BASE_URL}/news/${newsId}`);
    res.json(newsInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default NewsById;
