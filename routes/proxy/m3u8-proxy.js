import express from "express";
import fetch from "node-fetch";
import NodeCache from "node-cache";
import { URL } from "url";

const Proxy = express.Router();

const REFERER_URL = "https://megacloud.club/";
const cache = new NodeCache({ stdTTL: 600 });

async function fetchWithCustomReferer(url, refererUrl, retries = 3) {
    if (!url) throw new Error("URL is required");

    const isSegment = url.endsWith(".ts") || url.includes("seg-");
    const timeout = isSegment ? 30000 : 10000;

    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await fetch(url, {
                headers: {
                    "Referer": refererUrl,
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                    "Origin": new URL(refererUrl).origin,
                    "Accept": "*/*",
                    "Accept-Language": "en-US,en;q=0.9",
                    "Connection": "keep-alive",
                },
                redirect: 'follow',
                timeout: timeout,
            });

            return response;
        } catch (error) {
            if (attempt === retries) {
                console.error(`Fetch error after ${retries} attempts:`, error.message);
                throw error;
            }
            console.warn(`Attempt ${attempt} failed, retrying...`);
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
    }
}

function rewritePlaylistUrls(playlistText, baseUrl, proxyBaseUrl) {
    const base = new URL(baseUrl);
    return playlistText
        .split("\n")
        .map((line) => {
            const trimmed = line.trim();
            if (trimmed.startsWith("#") || trimmed === "") return line;

            try {
                const resolvedUrl = new URL(trimmed, base).href;
                return `${proxyBaseUrl}?url=${encodeURIComponent(resolvedUrl)}`;
            } catch (e) {
                return line;
            }
        })
        .join("\n");
}

Proxy.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

Proxy.get('/', async (req, res) => {
    try {
        if (!req.query.url) {
            return res.status(400).json({ error: "URL parameter is required" });
        }

        const url = decodeURIComponent(req.query.url);

        const cachedResponse = cache.get(url);
        if (cachedResponse) {
            console.log(`Cache hit: ${url}`);
            return res.status(200).send(cachedResponse);
        }

        const response = await fetchWithCustomReferer(url, REFERER_URL);
        const isM3U8 = url.endsWith(".m3u8");

        if (!response.ok) {
            return res.status(response.status).json({
                error: response.statusText,
                status: response.status
            });
        }

        if (isM3U8) {
            const playlistText = await response.text();
            const proxyBaseUrl = `${req.protocol}://${req.get("host")}/api/mantox/proxy`;
            const modifiedPlaylist = rewritePlaylistUrls(playlistText, url, proxyBaseUrl);

            cache.set(url, modifiedPlaylist);

            res.set({
                "Content-Type": "application/vnd.apple.mpegurl",
                "Cache-Control": "public, max-age=600"
            });
            return res.send(modifiedPlaylist);
        } else {
            const arrayBuffer = await response.arrayBuffer();
            cache.set(url, Buffer.from(arrayBuffer));

            res.set({
                "Content-Type": "video/mp2t",
                "Cache-Control": "public, max-age=31536000"
            });
            return res.send(Buffer.from(arrayBuffer));
        }
    } catch (error) {
        console.error('Proxy error:', error);
        return res.status(500).json({
            error: "Failed to fetch data",
            details: error.message
        });
    }
});

export default Proxy;
