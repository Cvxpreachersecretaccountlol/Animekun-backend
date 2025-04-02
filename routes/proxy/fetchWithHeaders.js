import fetch from "node-fetch";

async function fetchWithCustomReferer(url, refererUrl) {
    if (!url) throw new Error("URL is required");

    try {
        const response = await fetch(url, {
            headers: {
                "Referer": refererUrl,
                "User-Agent": 
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
                "Origin": new URL(refererUrl).origin,
                "Accept": "*/*",
                "Accept-Language": "en-US,en;q=0.9",
                "Connection": "keep-alive",
                "X-Forwarded-For": "45.33.32.156", // Fake IP address
                "X-Real-IP": "45.33.32.156", // Fake IP
                "X-Requested-With": "XMLHttpRequest",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "cross-site"
            },
            redirect: "follow",
            timeout: 20000 // Increased timeout
        });

        return response;
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
}

export default fetchWithCustomReferer;