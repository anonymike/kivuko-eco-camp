import {
  tentsExterior,
  twinTentInterior,
  ensuiteBathroom,
  diningPavilionExterior,
  diningPavilionInterior,
  diningAreaTables,
  diningRockOverhang,
  breakfastPlate,
  breakfastTable,
  bushWalk,
  agamaLizard,
} from "./imageAssets.js";

export const galleryCategories = ["All", "Stay", "Dining", "Experiences", "Wildlife", "Landscape"];

export const galleryImages = [
  { photo: tentsExterior, alt: "Kivuko tents beneath the rock formation", categories: ["Stay", "Landscape"] },
  { photo: twinTentInterior, alt: "Twin Tent interior with wilderness view", categories: ["Stay"] },
  { photo: ensuiteBathroom, alt: "En-suite bathroom with stone finishes", categories: ["Stay"] },
  { photo: diningPavilionExterior, alt: "Thatched dining pavilion exterior", categories: ["Dining", "Landscape"] },
  { photo: diningPavilionInterior, alt: "Dining pavilion beneath the rock overhang", categories: ["Dining", "Landscape"] },
  { photo: diningAreaTables, alt: "Dining tables set beneath the thatch", categories: ["Dining"] },
  { photo: diningRockOverhang, alt: "Table set beneath the rock overhang", categories: ["Dining", "Landscape"] },
  { photo: breakfastPlate, alt: "Breakfast plate close up", categories: ["Dining"] },
  { photo: breakfastTable, alt: "Breakfast table setting", categories: ["Dining"] },
  { photo: bushWalk, alt: "Guests on a guided bush walk", categories: ["Experiences"] },
  { photo: agamaLizard, alt: "Red-headed rock agama at camp", categories: ["Wildlife"] },
];
