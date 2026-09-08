import { campRoom, campAtNight, campTent } from "./imageAssets.js";

// Content matches the /packages screenshot exactly (nights/days badge,
// name, one-liner, price unit). No package inclusions were visible in the
// screenshot beyond these fields, so detail pages keep inclusions
// conservative until confirmed.
export const packages = [
  {
    slug: "kivuko-weekend",
    duration: "2 Nights · 3 Days",
    name: "The Kivuko Weekend",
    oneLiner: "Two nights of slow wilderness.",
    image: campRoom,
  },
  {
    slug: "fly-camping",
    duration: "1 Nights · 2 Days",
    name: "Fly Camping",
    oneLiner: "Sleep out under the stars.",
    image: campAtNight,
  },
  {
    slug: "tsavo-escape",
    duration: "3 Nights · 4 Days",
    name: "The Tsavo Escape",
    oneLiner: "Three nights deep in Tsavo.",
    image: campTent,
  },
];
