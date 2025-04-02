import fetchWithCustomReferer from "./fetchWithHeaders.js";
import express from "express";

const Proxy = express.Router();
const REFERER_URL = "https://megacloud.club/";

Proxy.get("/", async (req, res) => {
    try {
        const url = decodeURIComponent(req.query.url);
        if (!url) {
            return res.status(400).json({ error: "URL parameter is required" });
        }

        const response = await fetchWithCustomReferer(url, REFERER_URL);

        if (!response.ok) {
            return res.status(response.status).json({
                error: response.statusText,
                status: response.status
            });
        }

        // Get the raw M3U8 content
        const m3u8Content = await response.text();

        // Set correct headers for an M3U8 playlist
        res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", "0");

        // Send the M3U8 content directly
        res.status(200).send(m3u8Content);
    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

export default Proxy;