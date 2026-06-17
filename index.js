import express from "express";
import { getTopAnimeFromYear } from "./anilist.js";

const app = express();
const port = 3000;

let currentCharacter = "";
let currentAnswer = "";

app.get("/game/start", async (req, res) => {
  const animeList = await getTopAnimeFromYear();

  res.json({
    anime: animeList,
  });
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
