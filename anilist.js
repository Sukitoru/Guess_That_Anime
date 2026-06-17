function getRandomYear() {
  const year = Math.floor(Math.random() * 12) + 2015;

  return year;
}

async function getTopAnimeFromYear() {
  const year = getRandomYear();

  const query = `
    query ($year: Int) {
      Page(page: 1, perPage: 20) {
        media(type: ANIME, seasonYear: $year, sort: POPULARITY_DESC) {
          title {
            english
            romaji
          }
          seasonYear
        }
      }
    }
  `;

  const response = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: query,
      variables: {
        year: year,
      },
    }),
  });

  const data = await response.json();

  return data.data.Page.media;
}

export { getTopAnimeFromYear };
