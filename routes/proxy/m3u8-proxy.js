import fetchWithCustomReferer from "./fetchWithHeaders.js";
import express from "express";
import { URL } from "url";

const Proxy = express.Router();
const REFERER_URL = "https://megacloud.club/";

// Function to rewrite playlist URLs
function rewritePlaylistUrls(playlistText, baseUrl, proxyBaseUrl) {
    const base = new URL(baseUrl);
    return playlistText
        .split("\n")
        .map((line) => {
            const trimmed = line.trim();
            if (trimmed.startsWith("#") || trimmed === "") return line;

            try {
                const resolvedUrl = new URL(trimmed, base).href;
                return `${proxyBaseUrl}/proxy?url=${encodeURIComponent(resolvedUrl)}`;
            } catch (e) {
                console.warn("Failed to resolve URL:", trimmed);
                return line;
            }
        })
        .join("\n");
}

// Proxy Route
Proxy.get("/", async (req, res) => {
    try {
        if (!req.query.url) {
            return res.status(400).json({ error: "URL parameter is required" });
        }

        const originalUrl = decodeURIComponent(req.query.url);
        const response = await fetchWithCustomReferer(originalUrl, REFERER_URL);

        if (!response.ok) {
            return res.status(response.status).json({
                error: response.statusText,
                status: response.status,
            });
        }

        const isM3U8 = originalUrl.endsWith(".m3u8");

        if (isM3U8) {
            let m3u8Content = await response.text();
            const proxyBaseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;
            m3u8Content = rewritePlaylistUrls(m3u8Content, originalUrl, proxyBaseUrl);

            res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
            res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
            res.setHeader("Access-Control-Allow-Origin", "*");

            return res.status(200).send(m3u8Content);
        } else if (originalUrl.endsWith(".ts")) {
            const arrayBuffer = await response.arrayBuffer();
            res.setHeader("Content-Type", "video/mp2t");
            res.setHeader("Cache-Control", "public, max-age=31536000"); // Cache TS segments for efficiency
            return res.send(Buffer.from(arrayBuffer));
        } else {
            return res.status(400).json({ error: "Unsupported file type" });
        }
    } catch (error) {
        console.error("Proxy error:", error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

export default Proxy;