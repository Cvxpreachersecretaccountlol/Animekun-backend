import fetchWithCustomReferer from "./fetchWithHeaders.js";
import express from "express";
import { URL } from "url";

const Proxy = express.Router();
const REFERER_URL = "https://megacloud.club/";

Proxy.get("/", async (req, res) => {
    try {
        // Validate URL parameter
        if (!req.query.url) {
            return res.status(400).json({ error: "URL parameter is required" });
        }

        const originalUrl = decodeURIComponent(req.query.url);
        const response = await fetchWithCustomReferer(originalUrl, REFERER_URL);

        if (!response.ok) {
            return res.status(response.status).json({
                error: response.statusText,
                status: response.status
            });
        }

        // Get the raw M3U8 content
        let m3u8Content = await response.text();

        // Extract base URL from the original M3U8 link
        const baseUrl = new URL(originalUrl).origin;

        // Rewrite relative URLs inside the M3U8 file
        m3u8Content = m3u8Content.replace(
            /^(?!https?:\/\/)(index-.*?\.m3u8|iframes-.*?\.m3u8|.*?\.ts)$/gm,
            (match) => `${req.protocol}://${req.get("host")}${req.baseUrl}?url=${encodeURIComponent(`${baseUrl}/${match}`)}`
        );

        // Set correct headers for M3U8 playback
        res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
        res.setHeader("Content-Disposition", 'inline; filename="playlist.m3u8"');
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", "0");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");

        // Send the modified M3U8 content
        res.status(200).send(m3u8Content);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

export default Proxy;