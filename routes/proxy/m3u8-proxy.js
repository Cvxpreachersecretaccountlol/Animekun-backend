import express from "express";
import fetch from "node-fetch";
import NodeCache from "node-cache";
import morgan from "morgan";
import helmet from "helmet";
import { URL } from "url";

const Proxy = express.Router();

// ============================================
// CONFIGURATION
// ============================================

const REFERER_URL = "https://megacloud.club/";

// Initialize cache with a TTL of 10 minutes (600 seconds)
const cache = new NodeCache({ stdTTL: 600 });

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Fetch content from URL with custom referer and headers, with retry logic
 * @param {string} url - The URL to fetch
 * @param {string} refererUrl - The referer URL to use
 * @param {number} retries - Number of retries (default 3)
 * @returns {Promise<Response>} The fetch response
 */
async function fetchWithCustomReferer(url, refererUrl, retries = 3) {
    if (!url) throw new Error("URL is required");

    const isSegment = url.endsWith(".ts") || url.includes("seg-");
    const timeout = isSegment ? 30000 : 10000; // 30s for segments, 10s for playlists

    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await fetch(url, {
                headers: {
                    "Referer": refererUrl,
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                    "Origin": new URL(refererUrl).origin,
                    "Accept": "*/*",
                    "Accept-Language": "en-US,en;q=0.9",
                    "Accept-Encoding": "gzip, deflate",
                    "Connection": "keep-alive",
                    "Cache-Control": "no-cache",
                },
                redirect: 'follow',
                timeout: timeout,
                compress: true
            });

            return response;
        } catch (error) {
            const isLastAttempt = attempt === retries;
            if (isLastAttempt) {
                console.error(`Fetch error after ${retries} attempts:`, error.message);
                throw error;
            }
            console.warn(`Fetch attempt ${attempt} failed, retrying... (${error.message})`);
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt)); // Exponential backoff
        }
    }
}

/**
 * Rewrite M3U8 playlist URLs to proxy endpoints
 * @param {string} playlistText - The M3U8 playlist content
 * @param {string} baseUrl - The base URL for resolving relative URLs
 * @param {string} proxyBaseUrl - The proxy base URL for rewriting
 * @returns {string} The rewritten playlist
 */
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
                console.warn('Failed to resolve URL:', trimmed);
                return line; // Return original line if URL resolution fails
            }
        })
        .join("\n");
}

// ============================================
// ROUTES
// ============================================

/**
 * Health check endpoint
 */
Proxy.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

/**
 * Main streaming proxy endpoint with caching
 * Query parameters:
 *   - url: The URL to proxy (required)
 */
Proxy.get('/', async (req, res) => {
    try {
        const url = decodeURIComponent(req.query.url);
        if (!url) {
            return res.status(400).json({ error: "URL parameter is required" });
        }

        // Check cache for the URL
        const cachedResponse = cache.get(url);
        if (cachedResponse) {
            console.log(`Serving from cache: ${url}`);
            return res.status(200).send(cachedResponse);
        }

        // Fetch the content with custom referer
        const response = await fetchWithCustomReferer(url, REFERER_URL);
        const isM3U8 = url.endsWith(".m3u8");

        if (!response.ok) {
            return res.status(response.status).json({
                error: response.statusText,
                status: response.status
            });
        }

        if (isM3U8) {
            // Handle M3U8 playlist files
            const playlistText = await response.text();
            const proxyBaseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;
            const modifiedPlaylist = rewritePlaylistUrls(playlistText, url, proxyBaseUrl);

            // Cache the response
            cache.set(url, modifiedPlaylist);

            res.set({
                "Content-Type": "application/vnd.apple.mpegurl",
                "Cache-Control": "public, max-age=600" // 10 minutes
            });
            return res.send(modifiedPlaylist);
        } else {
            // Handle video segments and other binary files
            const arrayBuffer = await response.arrayBuffer();

            // Cache the response
            cache.set(url, Buffer.from(arrayBuffer));

            res.set({
                "Content-Type": "video/mp2t",
                "Cache-Control": "public, max-age=31536000" // 1 year for segments
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

// ============================================
// ERROR HANDLING
// ============================================

Proxy.use((err, req, res, next) => {
    console.error('Server error:', err.stack);
    res.status(500).json({
        error: "Something went wrong!",
        message: err.message
    });
});

export default Proxy;