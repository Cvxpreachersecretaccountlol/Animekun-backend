import express from 'express';

import SearchRouter from './searchAnime.js';
import GetAnimeInfo from './getAnimeInfo.js';
import AnimeByCategoryRouter from './getAnimeByCategory.js';
import GetAnimeByGenre from './getAnimeByGenre.js';
import GetAnimeInfoUtils from './getAnimeInfoUtils.js';
import GetSearchSuggestion from './getSearchSuggestion.js';
import GetAnimeByProducer from './getAnimesByProducers.js';
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
router.use('/mantox/catagory', AnimeByCategoryRouter);
router.use('/mantox/anime/genre', GetAnimeByGenre);
router.use('/mantox/animeinfo', GetAnimeInfoUtils);
router.use('/mantox/searchsuggestion', GetSearchSuggestion);
router.use('/mantox/producer', GetAnimeByProducer);
router.use('/mantox/schedule', GetAnimeEstimetedSchedule);
router.use('/mantox/episodes', GetEpisodesByAnimeId);
router.use('/mantox/episode/servers', GetEpisodeServers);
router.use('/mantox/episode/sources', GetEpisodeSources);
router.use('/mantox/get/', NewsRouter);
router.use('/mantox/get/news/', NewsById);

// proxy
router.use('/mantox/proxy/', Proxy);

export default router;