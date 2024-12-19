import { HiAnime } from "aniwatch";

process.on("message", async params => {
  const hianime = new HiAnime.Scraper(); // Fresh instance

  const { epid, query } = params;
  const server = query.s || "hd-1";
  const subOrDub = query.c;
  const ep = query.ep;
  const episodeId = `${epid}?ep=${ep}`;

  try {
    const data = await hianime.getEpisodeSources(episodeId, server, subOrDub);
    process.send(data);
  } catch (err) {
    process.send({ error: "Failed to fetch data" });
  }
});
