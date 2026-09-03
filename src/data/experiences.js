import { bushWalk, agamaLizard, tentsExterior } from "./imageAssets.js";

export const experiences = [
  {
    slug: "bush-walks",
    name: "Bush Walks",
    duration: "2–3 hours",
    oneLiner: "Track the wild on foot",
    image: bushWalk,
  },
  {
    slug: "bonfire-nights",
    name: "Bonfire Nights",
    duration: "Evening",
    oneLiner: "Stories beneath the stars",
    image: tentsExterior,
  },
  {
    slug: "birding",
    name: "Birding",
    duration: "2 hours",
    oneLiner: "Over 150 species, one habitat",
    image: agamaLizard,
  },
  {
    slug: "game-drives",
    name: "Game Drives",
    duration: "3–4 hours",
    oneLiner: "Tsavo, up close",
    image: bushWalk,
  },
  {
    slug: "wildlife-encounters",
    name: "Wildlife Encounters",
    duration: "Daily, at camp",
    oneLiner: "Watch the bush come to you",
    image: agamaLizard,
  },
  {
    slug: "kivuko-hill",
    name: "Kivuko Hill",
    duration: "Half day",
    oneLiner: "Scale the camp's namesake",
    image: tentsExterior,
  },
];
