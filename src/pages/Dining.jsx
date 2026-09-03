import PageLayout from "../components/layout/PageLayout.jsx";
import PageHero from "../components/ui/PageHero.jsx";
import Eyebrow from "../components/ui/Eyebrow.jsx";
import Button from "../components/ui/Button.jsx";
import Reveal from "../components/ui/Reveal.jsx";
import Image from "../components/ui/Image.jsx";
import {
  diningPavilionInterior,
  diningAreaTables,
  breakfastPlate,
  diningRockOverhang,
} from "../data/imageAssets.js";
import "./Dining.css";

// Bush-bar media is half the container on desktop; the feature shot is
// full-bleed; the closing plate is capped at 640px.
const HALF_SIZES = "(min-width: 900px) 50vw, 100vw";
const CLOSING_SIZES = "(min-width: 700px) 640px, 100vw";

const meals = [
  {
    title: "Breakfast",
    body: "A slow start beneath the thatch, with the conservancy waking up around you.",
  },
  {
    title: "Lunch",
    body: "Light and unhurried — served after a morning out, or beside camp.",
  },
  {
    title: "Dinner",
    body: "The day's stories, told over a full-board meal beneath the stars.",
  },
  {
    title: "Bush Dining",
    body: "Meals set out in the wild itself, framed by rock and open savanna.",
  },
];

export default function Dining() {
  return (
    <PageLayout>
      <PageHero
        image={diningPavilionInterior}
        imageAlt="Dining pavilion beneath the rock overhang at Kivuko"
        eyebrow="Dining"
        title="Dining in the Wild"
        badge="Full Board"
        subhead="Food Rooted in Place"
        intro="Every meal is part of the escape — unhurried, honest, and shaped by the land around you."
      />

      <section>
        <div className="container dining-meals">
          {meals.map((meal) => (
            <Reveal as="div" className="dining-meals__item" key={meal.title}>
              <h3>{meal.title}</h3>
              <p>{meal.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section--sand">
        <div className="container dining-bushbar">
          <Reveal as="div" className="dining-bushbar__text">
            <Eyebrow>Bush Bar</Eyebrow>
            <h2>Evenings by the Fire</h2>
            <p>
              Local beers, selected wines, cocktails, coffee, and refreshments — served around the evening
              campfire.
            </p>
          </Reveal>
          <Reveal as="div" className="dining-bushbar__media">
            <Image
              photo={diningAreaTables}
              alt="Dining tables set beneath the thatch at Kivuko"
              sizes={HALF_SIZES}
              loading="lazy"
            />
          </Reveal>
        </div>
      </section>

      <section className="dining-feature">
        <Image
          photo={diningRockOverhang}
          alt="Table set beneath the rock overhang for a private bush dinner"
          sizes="100vw"
          loading="lazy"
        />
        <div className="dining-feature__caption">
          <Reveal as="div">
            <Eyebrow tone="light">A Private Upsell</Eyebrow>
            <h2>Dine Beneath the Stars</h2>
            <p>A private bush dinner, set apart from camp — enquire to add it to your stay.</p>
            <Button to="/contact?subject=dining" variant="outline" tone="light">
              Enquire
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="section--tight">
        <div className="container">
          <Image
            photo={breakfastPlate}
            alt="Breakfast at Kivuko"
            className="dining-closing-image"
            sizes={CLOSING_SIZES}
            loading="lazy"
          />
        </div>
      </section>
    </PageLayout>
  );
}
