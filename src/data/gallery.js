import tentsExterior from "../assets/images/camp-tents-exterior-rock.jpg";
import twinTent from "../assets/images/stay-twin-tent-interior.jpg";
import ensuite from "../assets/images/stay-bathroom-ensuite.jpg";
import diningExterior from "../assets/images/dining-pavilion-exterior.jpg";
import diningInterior from "../assets/images/dining-pavilion-interior-rock.jpg";
import diningTables from "../assets/images/dining-area-tables.jpg";
import diningRockOverhang from "../assets/images/dining-rock-overhang-table.jpg";
import breakfastPlate from "../assets/images/dining-breakfast-plate.jpg";
import breakfastTable from "../assets/images/dining-breakfast-table.jpg";
import bushWalk from "../assets/images/experience-bush-walk-guide.jpg";
import lizard from "../assets/images/wildlife-agama-lizard.jpg";

export const galleryCategories = ["All", "Stay", "Dining", "Experiences", "Wildlife", "Landscape"];

export const galleryImages = [
  { src: tentsExterior, alt: "Kivuko tents beneath the rock formation", categories: ["Stay", "Landscape"] },
  { src: twinTent, alt: "Twin Tent interior with wilderness view", categories: ["Stay"] },
  { src: ensuite, alt: "En-suite bathroom with stone finishes", categories: ["Stay"] },
  { src: diningExterior, alt: "Thatched dining pavilion exterior", categories: ["Dining", "Landscape"] },
  { src: diningInterior, alt: "Dining pavilion beneath the rock overhang", categories: ["Dining", "Landscape"] },
  { src: diningTables, alt: "Dining tables set beneath the thatch", categories: ["Dining"] },
  { src: diningRockOverhang, alt: "Table set beneath the rock overhang", categories: ["Dining", "Landscape"] },
  { src: breakfastPlate, alt: "Breakfast plate close up", categories: ["Dining"] },
  { src: breakfastTable, alt: "Breakfast table setting", categories: ["Dining"] },
  { src: bushWalk, alt: "Guests on a guided bush walk", categories: ["Experiences"] },
  { src: lizard, alt: "Red-headed rock agama at camp", categories: ["Wildlife"] },
];
