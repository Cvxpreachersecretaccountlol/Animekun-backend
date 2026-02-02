import { Router } from "express";
import { HiAnime } from "aniwatch";

const router = Router();

async function fetchWithRetry(episodeId, server, category, maxRetries = 3) {
    const hianime = new HiAnime.Scraper();

    for (let i = 0; i < maxRetries; i++) {
        try {
            const data = await hianime.getEpisodeSources(episodeId, server, category);
            return { success: true, data };
        } catch (err) {
            console.log(`Attempt ${i + 1}/${maxRetries} failed for ${episodeId}, ${server}:`, err.message);
            if (i === maxRetries - 1) {
                return { success: false, error: err.message };
            }
            // Wait before retrying (exponential backoff: 1s, 2s, 3s)
            await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        }
    }
}

router.get("/:id", async (req, res) => {
    const episodeId = `${req.params.id}?ep=${req.query.ep}`;
    const server = req.query.s || "hd-1";
    const category = req.query.c || "sub";

    const result = await fetchWithRetry(episodeId, server, category);

    if (result.success) {
        return res.json(result.data);
    } else {
        return res.status(500).json({ error: result.error });
    }
});

export default router;
