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
