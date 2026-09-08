import {
  familyBandaStayPhoto,
  twinTentStayPhoto,
  doubleTentStayPhoto,
} from "./imageAssets.js";

const bandaCottageImage = {
  src: "/images/accommodation-banda-cottage.jpg",
  webp: [],
  width: 4096,
  height: 2731,
};

const twinTentImage = {
  src: "/images/accommodation-twin-tent.jpg",
  webp: [],
  width: 4096,
  height: 2731,
};

const doubleTentImage = {
  src: "/images/accommodation-double-tent.jpg",
  webp: [],
  width: 4096,
  height: 2731,
};

export const amenities = [
  "Private stone terrace",
  "En-suite bathroom",
  "Comfortable bedding",
  "Solar lighting",
  "Private seating area",
  "Sweeping wilderness views",
];

export const stayUnits = [
  {
    slug: "family-banda",
    name: "Banda / Cottage",
    description: "Secluded escape for families and small groups",
    capacity: "Up to 6 guests",
    image: bandaCottageImage,
    gallery: [bandaCottageImage, familyBandaStayPhoto],
  },
  {
    slug: "twin-tent",
    name: "Twin Tent",
    description: "Wake to mountain views from your private veranda",
    capacity: "Up to 4 guests",
    image: twinTentImage,
    gallery: [twinTentImage, twinTentStayPhoto],
  },
  {
    slug: "double-tent",
    name: "Double Tent",
    description: "King-size comfort opening up to Mt. Kasigau",
    capacity: "Up to 2 guests",
    image: doubleTentImage,
    gallery: [doubleTentImage, doubleTentStayPhoto],
  },
];
