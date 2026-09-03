import twinTent from "../assets/images/stay-twin-tent-interior.jpg";
import tentsExterior from "../assets/images/camp-tents-exterior-rock.jpg";
import ensuite from "../assets/images/stay-bathroom-ensuite.jpg";

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
    view: "Sunset & wilderness views",
    description: "Secluded escape for families and small groups",
    capacity: "Up to 6 guests",
    priceFrom: "480",
    image: tentsExterior,
    gallery: [tentsExterior, ensuite],
  },
  {
    slug: "twin-tent",
    name: "Twin Tent",
    view: "Mt. Kasigau views",
    description: "Wake to mountain views from your private veranda",
    capacity: "Up to 4 guests",
    priceFrom: "320",
    image: twinTent,
    gallery: [twinTent, ensuite],
  },
  {
    slug: "double-tent",
    name: "Double Tent",
    view: "Mt. Kasigau & Kivuko Hill views",
    description: "King-size comfort opening up to Mt. Kasigau",
    capacity: "Up to 2 guests",
    priceFrom: "320",
    image: tentsExterior,
    gallery: [tentsExterior, ensuite],
  },
];
