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


// Add this below your getTopAnimeFromYear() function   
  // Step 1: Write the GraphQL query (copy from earlier) complete
  // Step 2: Send a POST request to https://graphql.anilist.co I don't know how to parse a response
  // Step 3: Parse the response
  // Step 4: Filter only MAIN characters
  // Step 5: Return an object with anime title + characters array


async function getMainCharacters(animeId) {
  const query = `
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        id
        title {
          romaji
          english
        }
        characters(sort: ROLE, perPage: 10) {
          edges {
            role
            node {
              id
              name {
                full
              }
              image {
                large
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: query,
      variables: { id: animeId }
    })
  });




export { getTopAnimeFromYear, getMainCharacters };
