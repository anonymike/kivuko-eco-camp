import PageLayout from "../components/layout/PageLayout.jsx";
import PageHero from "../components/ui/PageHero.jsx";
import Eyebrow from "../components/ui/Eyebrow.jsx";
import Button from "../components/ui/Button.jsx";
import Reveal from "../components/ui/Reveal.jsx";
import heroImage from "../assets/images/dining-pavilion-interior-rock.jpg";
import tablesImage from "../assets/images/dining-area-tables.jpg";
import breakfastImage from "../assets/images/dining-breakfast-plate.jpg";
import rockOverhangImage from "../assets/images/dining-rock-overhang-table.jpg";
import "./Dining.css";

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
        image={heroImage}
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
            <img src={tablesImage} alt="Dining tables set beneath the thatch at Kivuko" />
          </Reveal>
        </div>
      </section>

      <section className="dining-feature">
        <img src={rockOverhangImage} alt="Table set beneath the rock overhang for a private bush dinner" />
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
          <img className="dining-closing-image" src={breakfastImage} alt="Breakfast at Kivuko" />
        </div>
      </section>
    </PageLayout>
  );
}
