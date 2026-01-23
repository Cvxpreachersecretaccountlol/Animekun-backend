import express from 'express';

import SearchRouter from './searchAnime.js';
import GetAnimeInfo from './getAnimeInfo.js';
import AnimeByCategoryRouter from './getAnimeByCategory.js';
import GetAnimeByGenre from './getAnimeByGenre.js';
import RawHianimeHomepage from './rawHianimeHomepage.js';
import GetSearchSuggestion from './getSearchSuggestion.js';
import GetAnimesByProducer from './getAnimesByProducers.js';
import GetAnimeEstimetedSchedule from './getAnimeEstimatedSchedule.js';
import GetEpisodesByAnimeId from './getAnimeEpesodeByAnimeId.js';
import GetEpisodeServers from './getEpisodeServers.js';
import GetEpisodeSources from './getEpisodeSources.js';
import GetHomepage from './getHomepage.js';
import NewsRouter from './getNews.js';
import NewsById from './getNewsById.js';
import Proxy from './proxy/m3u8-proxy.js';

const router = express.Router();

// routes
router.use('/mantox/get', GetHomepage);
router.use('/mantox/search', SearchRouter);
router.use('/mantox/anime/info', GetAnimeInfo);
router.use('/mantox/get/anime/category', AnimeByCategoryRouter);
router.use('/mantox/get/anime/genre', GetAnimeByGenre);
router.use('/mantox/get/raw', RawHianimeHomepage);
router.use('/mantox/get/searchsuggestion', GetSearchSuggestion);
router.use('/mantox/get/anime/producer', GetAnimesByProducer);
router.use('/mantox/get/anime/schedule', GetAnimeEstimetedSchedule);
router.use('/mantox/get/episodes', GetEpisodesByAnimeId);
router.use('/mantox/get/episode/servers', GetEpisodeServers);
router.use('/mantox/get/episode/sources', GetEpisodeSources);
router.use('/mantox/get/', NewsRouter);
router.use('/mantox/get/news/', NewsById);

// proxy
router.use('/mantox/proxy/', Proxy);

export default router;