import { experienceBushWalk, experienceBonfire, experienceBirding, experienceGameDrive, wildlifeImpala, wildlifeKudu, mountainSunset } from "./imageAssets.js";

export const experiences = [
  {
    slug: "bush-walks",
    name: "Bush Walks",
    duration: "2–3 hours",
    oneLiner: "Track the wild on foot",
    image: experienceBushWalk,
  },
  {
    slug: "bonfire-nights",
    name: "Bonfire Nights",
    duration: "Evening",
    oneLiner: "Stories beneath the stars",
    image: experienceBonfire,
  },
  {
    slug: "birding",
    name: "Birding",
    duration: "2 hours",
    oneLiner: "Over 150 species, one habitat",
    image: experienceBirding,
  },
  {
    slug: "game-drives",
    name: "Game Drives",
    duration: "3–4 hours",
    oneLiner: "Tsavo, up close",
    image: experienceGameDrive,
  },
  {
    slug: "wildlife-encounters",
    name: "Wildlife Encounters",
    duration: "Daily, at camp",
    oneLiner: "Watch the bush come to you",
    image: wildlifeImpala,
  },
  {
    slug: "kivuko-hill",
    name: "Kivuko Hill",
    duration: "Half day",
    oneLiner: "Scale the camp's namesake",
    image: mountainSunset,
  },
];
