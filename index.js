import express from "express";
import { getTopAnimeFromYear, getMainCharacters } from "./anilist.js";
const app = express();
const port = 3000;

let game;

let currentCharacter = "";
let currentAnswer = "";

app.get("/game/start", async (req, res) => {
  const animeList = await getTopAnimeFromYear();

  const randomIndex = Math.floor(Math.random() * animeList.length);

  const anime = animeList[randomIndex];

  const animeWithCharacters = await getMainCharacters(anime.id);

  const characterList = animeWithCharacters.characters.nodes;

  const randomCharacterIndex = Math.floor(Math.random() * characterList.length);

  const randomCharacter = characterList[randomCharacterIndex];

  res.json({
    character: randomCharacter.name.full,
    question: "What anime is this character from?"
  });
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
