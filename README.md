<div align="center">
	<br />
	<p>
		<a href="https://github.com/Subhajeetch/Animekun-frontend"><img src="https://i.postimg.cc/ZK2S8YK7/Pine-Tools-com-Screenshot-2025-12-15-160311.png" width="546" alt="animekun" /></a>
	</p>
	<br />
	<p>
		<a href="https://discord.gg/6DhssCN2Ph"><img src="https://img.shields.io/badge/join_our-discord-5865F2?logo=discord&logoColor=white" alt="Discord server" /></a>
        <a href="https://github.com/discordjs/discord.js/commits/main"><img src="https://img.shields.io/github/last-commit/subhajeetch/clean-bubble.svg?logo=github&logoColor=ffffff" alt="Last commit." /></a>
        <h1>Animekun Backend</h1>
</div>


> [!IMPORTANT]
>
> The content provided by this api is not owned by me and is not hosted by me. All content belongs to its respective owners. This api is for educational purposes only and demonstrates how to build web applications using scraped data in a responsible manner.

## About

An open-source anime API that provides scraped data such as anime information, streaming links, and anime & manga news.

## Local Installation
1. Run the following code to clone the repository and install all required dependencies

```bash
$ git clone https://github.com/Subhajeetch/Animekun-backend.git
$ cd Animekun-backend
$ npm install
```

2. Start the server

```bash
$ npm start 
# npm run dev - for development server
```

## Documentation

<details>

<summary>

### `GET` Anime HomePage

</summary>

#### Route Schema (URL)

```bash
/api/mantox/get/homepage
```

#### Request Sample

```javascript
import axios from "axios";

const url = "/api/mantox/get/homepage";
const data = async () => {
 try {
 const { data } = await axios.get(url);
 return data;
 } catch (err) {
 throw new Error(err.message);
 }
};

console.log(data);

```

#### Response Schema

```javascript
{
  success: boolean,
  data: {
    spotlightAnimes: [
      {
        rank: number,
        id: string,
        name: string,
        jname: string,
        description: string,
        poster: string,
        type: string,
        episodes: {
          sub: number,
          dub: number | null
        },
        otherInfo: string[]
      },
      { ... }
    ],

    trendingAnimes: [
      {
        rank: number,
        id: string,
        name: string,
        jname: string,
        poster: string
      },
      { ... }
    ],

    mostFavoriteAnimes: [
      {
        id: string,
        name: string,
        jname: string,
        poster: string,
        duration: string,
        type: string,
        rating: string | null,
        episodes: {
          sub: number,
          dub: number
        }
      },
      { ... }
    ],

    mostPopularAnimes: [
      {
        id: string,
        name: string,
        jname: string,
        poster: string,
        duration: string,
        type: string,
        rating: string | null,
        episodes: {
          sub: number,
          dub: number
        }
      },
      { ... }
    ],

    topAiringAnimes: [
      {
        id: string,
        name: string,
        jname: string,
        poster: string,
        duration: string,
        type: string,
        rating: string | null,
        episodes: {
          sub: number,
          dub: number | null
        }
      },
      { ... }
    ],

    underratedAnimes: [
      {
        id: string,
        name: string,
        jname: string,
        poster: string,
        duration: string,
        type: string,
        rating: string | null,
        episodes: {
          sub: number,
          dub: number
        }
      },
      { ... }
    ],

    specialAnimes: [
      {
        id: string,
        name: string,
        jname: string,
        poster: string,
        duration: string,
        type: "Special",
        rating: string | null,
        episodes: {
          sub: number,
          dub: number | null
        }
      },
      { ... }
    ],

    top10Animes: {
      today: [
        {
          id: string,
          rank: number,
          name: string,
          jname: string,
          poster: string,
          episodes: {
            sub: number,
            dub: number | null
          }
        },
        { ... }
      ],
      week: [ /* same structure as today */ ],
      month: [ /* same structure as today */ ]
    },

    newsFeed: [
      {
        id: string,
        title: string,
        date: string,
        topics: string[],
        preview: {
          intro: string,
          full: string
        },
        thumbnail: string,
        url: string
      },
      { ... }
    ]
  }
}

```

</details>

<details>
<summary>

### `GET` Raw Hianime Homepage

</summary>

#### Route Schema (URL)

```bash
/api/mantox/get/raw/homepage
```


#### Request Sample

```javascript
import axios from "axios";

const url = "/api/mantox/get/raw/homepage";
const data = async () => {
 try {
 const { data } = await axios.get(url);
 return data;
 } catch (err) {
 throw new Error(err.message);
 }
};

console.log(data);

```

#### Response Schema

```javascript
{
  success: boolean,
  data: {
    spotlightAnimes: [
      {
        rank: number,
        id: string,
        name: string,
        jname: string,
        description: string,
        poster: string,
        type: string, // TV | Movie | OVA | ONA | Special
        episodes: {
          sub: number,
          dub: number | null
        },
        otherInfo: string[] // [type, duration, releaseDate, quality]
      },
      { ... }
    ],

    trendingAnimes: [
      {
        rank: number,
        id: string,
        name: string,
        jname: string,
        poster: string
      },
      { ... }
    ],

    latestEpisodeAnimes: [
      {
        id: string,
        name: string,
        jname: string,
        poster: string,
        duration: string,
        type: string,
        rating: string | null,
        episodes: {
          sub: number,
          dub: number | null
        }
      },
      { ... }
    ],

    topUpcomingAnimes: [
      {
        id: string,
        name: string,
        jname: string,
        poster: string,
        duration: string, // date or "?"
        type: string,     // TV (? eps) | Movie (1 eps) | ONA (? eps)
        rating: string | null,
        episodes: {
          sub: number | null,
          dub: number | null
        }
      },
      { ... }
    ],

    top10Animes: {
      today: [
        {
          id: string,
          rank: number,
          name: string,
          jname: string,
          poster: string,
          episodes: {
            sub: number,
            dub: number | null
          }
        },
        { ... }
      ],

      week: [
        {
          id: string,
          rank: number,
          name: string,
          jname: string,
          poster: string,
          episodes: {
            sub: number,
            dub: number | null
          }
        },
        { ... }
      ],

      month: [
        {
          id: string,
          rank: number,
          name: string,
          jname: string,
          poster: string,
          episodes: {
            sub: number,
            dub: number | null
          }
        },
        { ... }
      ]
    },

    topAiringAnimes: [
      {
        id: string,
        name: string,
        jname: string,
        poster: string,
        type: string, // TV | ONA | OVA | Special
        episodes: {
          sub: number,
          dub: number | null
        }
      },
      { ... }
    ],

    mostPopularAnimes: [
      {
        id: string,
        name: string,
        jname: string,
        poster: string,
        type: string,
        episodes: {
          sub: number,
          dub: number
        }
      },
      { ... }
    ],

    mostFavoriteAnimes: [
      {
        id: string,
        name: string,
        jname: string,
        poster: string,
        type: string,
        episodes: {
          sub: number,
          dub: number
        }
      },
      { ... }
    ],

    latestCompletedAnimes: [
      {
        id: string,
        name: string,
        jname: string,
        poster: string,
        type: string,
        episodes: {
          sub: number,
          dub: number | null
        }
      },
      { ... }
    ],

    genres: string[]
  }
}


```

</details>


<details>

<summary>

### `GET` Anime Search

</summary>

#### Route Schema (URL)

```bash
/api/mantox/search
```

#### Query Parameters

|  Parameter   |  Type  |                            Description                            | Required? | Default |
| :----------: | :----: | :---------------------------------------------------------------: | :-------: | :-----: |
|     `q`      | string | The search query, i.e. the title of the item you are looking for. |    Yes    |   --    |
|    `page`    | number |                  The page number of the result.                   |    No     |   `1`   |
|    `type`    | string |                  Type of the anime. eg: `movie`                   |    No     |   --    |
|   `status`   | string |            Status of the anime. eg: `finished-airing`             |    No     |   --    |
|   `rated`    | string |             Rating of the anime. eg: `r+` or `pg-13`              |    No     |   --    |
|   `score`    | string |           Score of the anime. eg: `good` or `very-good`           |    No     |   --    |
|   `season`   | string |              Season of the aired anime. eg: `spring`              |    No     |   --    |
|  `language`  | string |     Language category of the anime. eg: `sub` or `sub-&-dub`      |    No     |   --    |
| `start_date` | string |       Start date of the anime(yyyy-mm-dd). eg: `2014-10-2`        |    No     |   --    |
|  `end_date`  | string |        End date of the anime(yyyy-mm-dd). eg: `2010-12-4`         |    No     |   --    |
|    `sort`    | string |      Order of sorting the anime result. eg: `recently-added`      |    No     |   --    |
|   `genres`   | string |   Genre of the anime, separated by commas. eg: `isekai,shounen`   |    No     |   --    |

> [!TIP]
> For both `start_date` and `end_date`, year must be mentioned. If you wanna omit date or month specify `0` instead.
> Eg: omitting date -> 2014-10-0, omitting month -> 2014-0-12, omitting both -> 2014-0-0


#### Request Sample

```javascript
import axios from "axios";

const url = "/api/mantox/search";
const query = "blue-lock";
const data = async () => {
 try {
 const { data } = await axios.get(url, { params: { q: query } });
 return data;
 } catch (err) {
 throw new Error(err.message);
 }
};

console.log(data);

```

#### Response Schema

```javascript
{
  success: boolean,
  data: {
    animes: [
      {
        id: string,
        name: string,
        jname: string,
        poster: string,
        duration: string,
        type: string, // TV | Movie | OVA | Special
        rating: string | null,
        episodes: {
          sub: number,
          dub: number | null
        }
      },
      { ... }
    ],

    mostPopularAnimes: [
      {
        id: string,
        name: string,
        jname: string,
        poster: string,
        type: string,
        episodes: {
          sub: number,
          dub: number
        }
      },
      { ... }
    ],

    searchQuery: string,

    searchFilters: {
      genres: string[] | null
    },

    pagination: {
      totalPages: number,
      currentPage: number,
      hasNextPage: boolean
    }
  }
}

```
</details>



<details>
<summary>

### `GET` Anime Info

</summary>

#### Route Schema (URL)

```bash
/api/mantox/anime/info/{animeId}
```

#### Query Parameters

| Parameter |  Type  |             Description              | Required? | Default |
| :-------: | :----: | :----------------------------------: | :-------: | :-----: |
| `animeId` | string | The unique anime id (in kebab case). |    Yes    |   --    |


#### Request Sample

```javascript
import axios from "axios";

const url = "/api/mantox/anime/info/chainsaw-man-17406";
const data = async () => {
 try {
 const { data } = await axios.get(url);
 return data;
 } catch (err) {
 throw new Error(err.message);
 }
};

console.log(data);

```

#### Response Schema

```javascript
{
  success: boolean,
  data: {
    anime: {
      info: {
        id: string,
        anilistId: number,
        malId: number,
        name: string,
        poster: string,
        description: string,

        stats: {
          rating: string,
          quality: string,
          episodes: {
            sub: number,
            dub: number
          },
          type: string, // TV | Movie | OVA | Special | ONA
          duration: string
        },

        promotionalVideos: [
          {
            title: string,
            source: string,
            thumbnail: string
          }
        ],

        charactersVoiceActors: [
          {
            character: {
              id: string,
              poster: string,
              name: string,
              cast: string // Main | Supporting
            },
            voiceActor: {
              id: string,
              poster: string,
              name: string,
              cast: string
            }
          }
        ]
      },

      moreInfo: {
        japanese: string,
        aired: string,
        premiered: string,
        duration: string,
        status: string,
        malscore: string,
        genres: string[],
        studios: string,
        producers: string[]
      }
    },

    seasons: [
      {
        id: string,
        name: string,
        poster: string,
        type: string,
        episodes: {
          sub: number,
          dub: number | null
        }
      }
    ],

    mostPopularAnimes: [
      {
        id: string,
        name: string,
        jname: string,
        poster: string,
        type: string,
        episodes: {
          sub: number,
          dub: number
        }
      }
    ],

    relatedAnimes: [
      {
        id: string,
        name: string,
        jname: string,
        poster: string,
        type: string,
        episodes: {
          sub: number,
          dub: number
        }
      }
    ],

    recommendedAnimes: [
      {
        id: string,
        name: string,
        jname: string,
        poster: string,
        duration: string,
        type: string, // TV | Movie | OVA | Special | ONA
        rating: string | null,
        episodes: {
          sub: number,
          dub: number | null
        }
      }
    ]
  }
}

```

</details>

<details>
<summary>

### `GET` Animes By Category

</summary>

#### Route Schema (URL)

```bash
/api/mantox/get/anime/category/{category}
```

#### Path Parameters

| Parameter |  Type  |             Description              | Required? | Default |
| :-------: | :----: | :----------------------------------: | :-------: | :-----: |
| `category` | string | Anime category eg: `most-favorite`, `most-popular`, `subbed-anime`, `dubbed-anime`, etc. |    Yes    |   --    |

#### Query Parameters

| Parameter |  Type  |             Description              | Required? | Default |
| :-------: | :----: | :----------------------------------: | :-------: | :-----: |
| `page` | number | Page number |    No    |   1    |


#### Request Sample

```javascript
import axios from "axios";

const url = "/api/mantox/get/anime/category/most-favorite";
const data = async () => {
 try {
 const { data } = await axios.get(url);
 return data;
 } catch (err) {
 throw new Error(err.message);
 }
};

console.log(data);

```

#### Response Schema

```javascript
{
  success: boolean,
  data: {
    animes: [
      {
        id: string,
        name: string,
        jname: string,
        poster: string,
        duration: string, // e.g. "24m"
        type: string,     // TV | Movie | OVA | ONA | Special
        rating: string | null, // e.g. "PG-13"
        episodes: {
          sub: number,
          dub: number
        }
      },
      { ... }
    ],

    genres: string[],

    top10Animes: {
      today: [
        {
          id: string,
          rank: number,
          name: string,
          jname: string,
          poster: string,
          episodes: {
            sub: number,
            dub: number | null
          }
        },
        { ... }
      ],

      week: [
        {
          id: string,
          rank: number,
          name: string,
          jname: string,
          poster: string,
          episodes: {
            sub: number,
            dub: number | null
          }
        },
        { ... }
      ],

      month: [
        {
          id: string,
          rank: number,
          name: string,
          jname: string,
          poster: string,
          episodes: {
            sub: number,
            dub: number | null
          }
        },
        { ... }
      ]
    },

    category: string, // e.g. "Most Favorite", "Most Popular", etc.

    pagination: {
      totalPages: number,
      currentPage: number,
      hasNextPage: boolean
    }
  }
}


```

</details>

<details>
<summary>

### `GET` Animes By Genre

</summary>

#### Route Schema (URL)

```bash
/api/mantox/get/anime/genre/{genre}
```

#### Path Parameters

| Parameter |  Type  |             Description              | Required? | Default |
| :-------: | :----: | :----------------------------------: | :-------: | :-----: |
| `genre` | string | Anime genre eg: `action`, `thriller`, `romance`, etc. |    Yes    |   --    |


#### Query Parameters

| Parameter |  Type  |             Description              | Required? | Default |
| :-------: | :----: | :----------------------------------: | :-------: | :-----: |
| `page` | number | Page number |    No    |   1    |


#### Request Sample

```javascript
import axios from "axios";

const url = "/api/mantox/get/anime/genre/action";
const data = async () => {
 try {
 const { data } = await axios.get(url);
 return data;
 } catch (err) {
 throw new Error(err.message);
 }
};

console.log(data);

```

#### Response Schema

```javascript
{
  success: boolean,
  data: {
    genreName: string, // e.g. "Action Anime"

    animes: [
      {
        id: string,
        name: string,
        jname: string,
        poster: string,
        duration: string, // e.g. "24m", "95m"
        type: string,     // TV | Movie | OVA | ONA | Special
        rating: string | null, // e.g. "Pg-13"
        episodes: {
          sub: number,
          dub: number | null
        }
      },
      { ... }
    ],

    genres: string[],

    topAiringAnimes: [
      {
        id: string,
        name: string,
        jname: string,
        poster: string,
        type: string, // TV | ONA | OVA | Special
        episodes: {
          sub: number,
          dub: number | null
        }
      },
      { ... }
    ],

    pagination: {
      totalPages: number,
      currentPage: number,
      hasNextPage: boolean
    }
  }
}

```

</details>

<details>
<summary>

### `GET` Animes By Producer

</summary>

#### Route Schema (URL)

```bash
/api/mantox/get/anime/producer/{producer}
```

#### Path Parameters

| Parameter |  Type  |             Description              | Required? | Default |
| :-------: | :----: | :----------------------------------: | :-------: | :-----: |
| `producer` | string | Anime producer eg: `mappa`, `twin-engine`, `toho-animation`, etc. |    Yes    |   --    |


#### Query Parameters

| Parameter |  Type  |             Description              | Required? | Default |
| :-------: | :----: | :----------------------------------: | :-------: | :-----: |
| `page` | number | Page number |    No    |   1    |


#### Request Sample

```javascript
import axios from "axios";

const url = "/api/mantox/get/anime/producer/mappa";
const data = async () => {
 try {
 const { data } = await axios.get(url);
 return data;
 } catch (err) {
 throw new Error(err.message);
 }
};

console.log(data);

```

#### Response Schema

```javascript
{
  success: boolean,
  data: {
    producerName: string, // e.g. "MAPPA Anime"

    animes: [
      {
        id: string,
        name: string,
        jname: string,
        poster: string,
        duration: string, // e.g. "23m", "95m"
        type: string,     // TV | Movie | OVA | ONA | Special
        rating: string | null, // e.g. "18+"
        episodes: {
          sub: number,
          dub: number | null
        }
      },
      { ... }
    ],

    top10Animes: {
      today: [
        {
          id: string,
          rank: number,
          name: string,
          jname: string,
          poster: string,
          episodes: {
            sub: number,
            dub: number | null
          }
        },
        { ... }
      ],

      week: [
        {
          id: string,
          rank: number,
          name: string,
          jname: string,
          poster: string,
          episodes: {
            sub: number,
            dub: number | null
          }
        },
        { ... }
      ],

      month: [
        {
          id: string,
          rank: number,
          name: string,
          jname: string,
          poster: string,
          episodes: {
            sub: number,
            dub: number | null
          }
        },
        { ... }
      ]
    },

    topAiringAnimes: [
      {
        id: string,
        name: string,
        jname: string,
        poster: string,
        type: string, // TV | ONA | OVA | Special
        episodes: {
          sub: number,
          dub: number | null
        }
      },
      { ... }
    ],

    pagination: {
      totalPages: number,
      currentPage: number,
      hasNextPage: boolean
    }
  }
}
```
</details>


<details>
<summary>

### `GET` Search Suggestion

</summary>

#### Route Schema (URL)

```bash
/api/mantox/get/searchsuggestion?q={query}
```


#### Query Parameters

| Parameter |  Type  |             Description              | Required? | Default |
| :-------: | :----: | :----------------------------------: | :-------: | :-----: |
| `query` | string | Query to get search suggestion |    yes    |   --    |


#### Request Sample

```javascript
import axios from "axios";

const url = "/api/mantox/get/searchsuggestion?q=blue-lock";
const data = async () => {
 try {
 const { data } = await axios.get(url);
 return data;
 } catch (err) {
 throw new Error(err.message);
 }
};

console.log(data);

```

#### Response Schema

```javascript
{
  success: boolean,
  data: {
    suggestions: [
      {
        id: string,
        name: string,
        jname: string,
        poster: string,
        moreInfo: [
          string, // release date (e.g. "Feb 17, 2023")
          string, // type (TV | Movie | OVA | ONA | Special)
          string  // duration (e.g. "24m", "1h 59m")
        ]
      },
      { ... }
    ]
  }
}
```
</details>


<details>
<summary>

### `GET` Anime Airing Estimated SChedule

</summary>

#### Route Schema (URL)

```bash
/api/mantox/get/anime/schedule/{date}
```


#### Query Parameters

| Parameter |  Type  |             Description              | Required? | Default |
| :-------: | :----: | :----------------------------------: | :-------: | :-----: |
| `date` | string | Date to get anime airing schedule in this formate - "yyyy-mm-dd"  |    yes    |   --    |


#### Request Sample

```javascript
import axios from "axios";

const url = "/api/mantox/get/anime/schedule/2026-01-14";
const data = async () => {
 try {
 const { data } = await axios.get(url);
 return data;
 } catch (err) {
 throw new Error(err.message);
 }
};

console.log(data);

```

#### Response Schema

```javascript
{
  success: boolean,
  data: {
    scheduledAnimes: [
      {
        id: string,
        time: string, // HH:mm (local airing time)
        name: string,
        jname: string,
        airingTimestamp: number, // Unix timestamp in milliseconds
        secondsUntilAiring: number, // seconds remaining until episode airs
        episode: number // episode number that will air
      },
      { ... }
    ]
  }
}

```
</details>

<details>
<summary>

### `GET` Episodes By Anime ID

</summary>

#### Route Schema (URL)

```bash
/api/mantox/get/episodes/{animeId}
```

#### Path Parameters

| Parameter |  Type  |             Description              | Required? | Default |
| :-------: | :----: | :----------------------------------: | :-------: | :-----: |
| `animeId` | string | The unique anime id (in kebab case). |    Yes    |   --    |


#### Request Sample

```javascript
import axios from "axios";

const url = "/api/mantox/get/episodes/chainsaw-man-17406";
const data = async () => {
 try {
 const { data } = await axios.get(url);
 return data;
 } catch (err) {
 throw new Error(err.message);
 }
};

console.log(data);

```

#### Response Schema

```javascript
{
  success: boolean,
  data: {
    totalEpisodes: number,

    episodes: [
      {
        title: string,
        episodeId: string, // unique episode identifier / watch URL param
        number: number,    // episode number
        isFiller: boolean
      },
      { ... }
    ]
  }
}


```

</details>


<details>
<summary>

### `GET` Episode Servers

</summary>

#### Route Schema (URL)

```bash
/api/mantox/get/episode/servers/{episodeId}
```

#### Path Parameters

| Parameter |  Type  |             Description              | Required? | Default |
| :-------: | :----: | :----------------------------------: | :-------: | :-----: |
| `episodeId` | string | The unique episode id (partial). |    Yes    |   --    |

#### Query Parameters

| Parameter |  Type  |             Description              | Required? | Default |
| :-------: | :----: | :----------------------------------: | :-------: | :-----: |
| `ep` | string | The second half of the episode ID |    Yes    |   --    |


#### Request Sample

```javascript
import axios from "axios";

const url = "/api/mantox/get/episode/servers/chainsaw-man-17406?ep=94597";
const data = async () => {
 try {
 const { data } = await axios.get(url);
 return data;
 } catch (err) {
 throw new Error(err.message);
 }
};

console.log(data);

```

#### Response Schema

```javascript
{
  success: boolean,
  data: {
    episodeId: string, // episode identifier
    episodeNo: number,

    sub: [
      {
        serverName: string, // e.g. "hd-1", "hd-2"
        serverId: number
      },
      { ... }
    ],

    dub: [
      {
        serverName: string,
        serverId: number
      },
      { ... }
    ],

    raw: [
      {
        serverName: string,
        serverId: number
      },
      { ... }
    ]
  }
}


```

</details>


<details>
<summary>

### `GET` Episode Sources

</summary>

#### Route Schema (URL)

```bash
/api/mantox/get/episode/sources/{episodeId}
```

#### Path Parameters

| Parameter |  Type  |             Description              | Required? | Default |
| :-------: | :----: | :----------------------------------: | :-------: | :-----: |
| `episodeId` | string | The unique episode id (partial). |    Yes    |   --    |

#### Query Parameters

| Parameter |  Type  |             Description              | Required? | Default |
| :-------: | :----: | :----------------------------------: | :-------: | :-----: |
| `ep` | string | The second half of the episode ID |    Yes    |   --    |
| `s` | string | Server ID to fetch sources from |    No     | `hd-1` |
| `c` | string | Category: `sub` for subtitled or `dub` for dubbed |    No     |   --    |


#### Request Sample

```javascript
import axios from "axios";

const url = "/api/mantox/get/episode/sources/chainsaw-man-17406?ep=94597&s=hd-1&c=sub";
const data = async () => {
 try {
 const { data } = await axios.get(url);
 return data;
 } catch (err) {
 throw new Error(err.message);
 }
};

console.log(data);

```

#### Response Schema

```javascript
{
  success: boolean,
  data: {
    headers: {
      Referer: string // required request header for stream playback
    },

    tracks: [
      {
        url: string,  // VTT subtitle or thumbnails file
        lang: string  // e.g. "English", "Spanish", "Arabic", "thumbnails"
      },
      { ... }
    ],

    intro: {
      start: number, // seconds
      end: number
    },

    outro: {
      start: number, // seconds
      end: number
    },

    sources: [
      {
        url: string,   // stream URL
        isM3U8: boolean,
        type: string   // "hls"
      },
      { ... }
    ],

    anilistID: number,
    malID: number
  }
}

```

</details>


<details>
<summary>

### `GET` Anime News

</summary>

#### Route Schema (URL)

```bash
/api/mantox/get/news
```

#### Query Parameters

| Parameter |  Type  |             Description              | Required? | Default |
| :-------: | :----: | :----------------------------------: | :-------: | :-----: |
| `topic` | string | Filter news by topic (optional) |    No     |   --    |


#### Request Sample

```javascript
import axios from "axios";

const url = "/api/mantox/get/news";
const data = async () => {
 try {
 const { data } = await axios.get(url);
 return data;
 } catch (err) {
 throw new Error(err.message);
 }
};

console.log(data);

```

#### Response Schema

```javascript
{
  success: boolean,
  data: {
    news: [
      {
        id: string,         // unique article identifier / slug
        title: string,
        uploadedAt: string, // formatted date-time (e.g. "Jan 23, 21:09")

        topics: [
          string // e.g. "anime", "manga"
        ],

        preview: {
          intro: string, // short preview text (may be empty)
          full: string   // full preview text (may be empty)
        },

        thumbnail: string, // image URL
        url: string        // full article URL
      },
      { ... }
    ]
  }
}


```

</details>


<details>
<summary>

### `GET` News Article By ID

</summary>

#### Route Schema (URL)

```bash
/api/mantox/get/news/info
```

#### Query Parameters

| Parameter |  Type  |             Description              | Required? | Default |
| :-------: | :----: | :----------------------------------: | :-------: | :-----: |
| `id` | string | The unique news article ID |    Yes    |   --    |


#### Request Sample

```javascript
import axios from "axios";

const url = "/api/mantox/get/news/info?id=2026-01-23/japanese-animation-tv-ranking-january-12-18/.233401";
const data = async () => {
 try {
 const { data } = await axios.get(url);
 return data;
 } catch (err) {
 throw new Error(err.message);
 }
};

console.log(data);

```
#### Response Schema

```javascript
{
  success: boolean,
  data: {
    id: string,         
    title: string,
    uploadedAt: string,
    intro: string,      
    description: string,
    thumbnail: string,   
    url: string
  }
}

```

</details>


<details>
<summary>

### `GET` M3U8 Proxy

</summary>

#### Route Schema (URL)

```bash
/api/mantox/proxy/
```

#### Query Parameters

| Parameter |  Type  |             Description              | Required? | Default |
| :-------: | :----: | :----------------------------------: | :-------: | :-----: |
| `url` | string | The URL to proxy (m3u8 playlist or video segment) |    Yes    |   --    |


#### Description

This is a media proxy endpoint that handles streaming of anime content. It supports:
- **M3U8 Playlist Rewriting**: Automatically rewrites M3U8 playlists to proxy all segment URLs
- **Video Segment Streaming**: Proxies video segments (.ts files) with proper headers
- **Caching**: Implements intelligent caching (10 minutes for playlists, 1 year for segments)
- **Retry Logic**: Includes automatic retry with exponential backoff for failed requests
- **Custom Headers**: Sends appropriate referer and user-agent headers for compatibility

#### Request Sample

```javascript
import axios from "axios";

// For M3U8 playlist
const playlistUrl = "/api/mantox/proxy/?url=https://rainveil36.xyz/...../master.m3u8";

// For video segment
const segmentUrl = "/api/mantox/proxy/?url=https%3A%2F%2Fexample.com%2Fsegment.ts";

const data = async () => {
 try {
 const { data } = await axios.get(playlistUrl);
 return data;
 } catch (err) {
 throw new Error(err.message);
 }
};

console.log(data);

```

#### Response Schema

**For M3U8 Playlists:**
```
#EXTM3U
#EXT-X-VERSION:3
#EXT-X-TARGETDURATION:10
#EXTINF:9.9,
/api/mantox/proxy/?url=https%3A%2F%2Fexample.com%2Fsegment1.ts
#EXTINF:9.9,
/api/mantox/proxy/?url=https%3A%2F%2Fexample.com%2Fsegment2.ts
...
#EXT-X-ENDLIST
```

**For Video Segments:**
Binary video data (MPEG-TS format)

#### Health Check

```bash
GET /api/mantox/proxy/health
```

Returns:
```javascript
{
  status: "ok"
}
```

</details>