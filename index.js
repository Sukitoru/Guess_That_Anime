import express from "express";
import { getTopAnimeFromYear, getMainCharacters } from "./anilist.js";

const app = express();
const port = 3000;

let game 

let currentCharacter = "";
let currentAnswer = "";

app.get("/game/start", async (req, res) => {
  const animeId = await getMainCharacters(113415);

  res.json({
    id: animeId
    // anime: animeList,
  });
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
