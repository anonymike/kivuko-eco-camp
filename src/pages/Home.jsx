import CinematicHero from "../components/sections/CinematicHero.jsx";
import SectionIntro from "../components/ui/SectionIntro.jsx";
import Eyebrow from "../components/ui/Eyebrow.jsx";
import Button from "../components/ui/Button.jsx";
import CardGrid from "../components/ui/CardGrid.jsx";
import Card from "../components/ui/Card.jsx";
import Reveal from "../components/ui/Reveal.jsx";
import Image from "../components/ui/Image.jsx";
import PageLayout from "../components/layout/PageLayout.jsx";
import { stayUnits } from "../data/stay.js";
import { experiences } from "../data/experiences.js";
import { agamaLizard, breakfastTable, diningRockOverhang, largestWebp } from "../data/imageAssets.js";
import "./Home.css";

// Dining split is half the container on desktop; the sundowner is full-bleed.
const HALF_SIZES = "(min-width: 900px) 50vw, 100vw";

const occasions = [
  "A romantic escape",
  "A family adventure",
  "A wildlife experience",
  "A cultural journey",
];

export default function Home() {
  return (
    <>
      <CinematicHero />

      <PageLayout>
        {/* Intro — "More Than a Stay" */}
        <section className="section--tight">
          <div className="container">
            <SectionIntro eyebrow="More Than a Stay" title="Some holidays give you photographs.">
              Some give you souvenirs. Kivuko gives you stories.
            </SectionIntro>
          </div>
        </section>

        {/* Come for the Wilderness */}
        <section className="section--sand">
          <div className="container home-occasions">
            <Reveal as="div" className="home-occasions__text">
              <h2>Come for the wilderness. Stay for the experience. Leave with a story.</h2>
            </Reveal>
            <Reveal as="ul" className="home-occasions__list">
              {occasions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </Reveal>
          </div>
        </section>

        {/* Proximity strip */}
        <section className="section--tight">
          <div className="container">
            <Reveal as="ul" className="home-proximity">
              <li>
                <strong>17 km</strong>
                <span>from Mombasa–Nairobi Road</span>
              </li>
              <li>
                <strong>22 km</strong>
                <span>from Miasenyi Station</span>
              </li>
              <li>
                <strong>20 km</strong>
                <span>from Buchuma Gate, Tsavo East</span>
              </li>
            </Reveal>
          </div>
        </section>

        {/* Accommodation teaser */}
        <section>
          <div className="container">
            <SectionIntro eyebrow="Accommodation" title="Private Spaces, Pure Wilderness">
              Each unit is designed to disappear into the landscape while keeping you close to the wild.
            </SectionIntro>
            <CardGrid>
              {stayUnits.map((unit) => (
                <Card
                  key={unit.slug}
                  to={`/stay/${unit.slug}`}
                  image={unit.image}
                  imageAlt={unit.name}
                  badge={unit.view}
                  title={unit.name}
                  description={unit.description}
                  meta={`${unit.capacity} · From $${unit.priceFrom}/night`}
                />
              ))}
            </CardGrid>
            <div className="home-section-cta">
              <Button to="/stay" variant="outline" tone="dark">
                View All Stays
              </Button>
            </div>
          </div>
        </section>

        {/* Experiences teaser */}
        <section className="section--sand">
          <div className="container">
            <SectionIntro eyebrow="Experiences" title="Choose Your Adventure">
              From gentle birding to a challenging hill climb — each experience is shaped by the land and the
              moment.
            </SectionIntro>
            <CardGrid columns={4}>
              {experiences.slice(0, 4).map((exp) => (
                <Card
                  key={exp.slug}
                  to={`/experiences/${exp.slug}`}
                  image={exp.image}
                  imageAlt={exp.name}
                  badge={exp.duration}
                  title={exp.name}
                  description={exp.oneLiner}
                  linkLabel="Discover"
                />
              ))}
            </CardGrid>
            <div className="home-section-cta">
              <Button to="/experiences" variant="outline" tone="dark">
                All Experiences
              </Button>
            </div>
          </div>
        </section>

        {/* Dining teaser */}
        <section>
          <div className="container home-dining">
            <Reveal as="div" className="home-dining__media">
              <Image
                photo={breakfastTable}
                alt="Breakfast set for two at Kivuko"
                sizes={HALF_SIZES}
                loading="lazy"
              />
            </Reveal>
            <Reveal as="div" className="home-dining__text">
              <Eyebrow>Dining</Eyebrow>
              <h2>Taste the Wild</h2>
              <p>Every meal is part of the escape — unhurried, honest, and shaped by the land around you.</p>
              <Button to="/dining" variant="outline" tone="dark">
                Explore Dining
              </Button>
            </Reveal>
          </div>
        </section>

        {/* Watering Hole feature — dark, matches screenshot 2 */}
        <section className="section--dark home-watering-hole">
          <div
            className="home-watering-hole__bg"
            style={{ backgroundImage: `url(${largestWebp(agamaLizard)})` }}
            aria-hidden="true"
          />
          <div className="container home-watering-hole__content">
            <Reveal as="div">
              <Eyebrow tone="light">The Watering Hole</Eyebrow>
              <h2>Wildlife Comes to You</h2>
              <p>
                At Kivuko, you don&apos;t always have to go looking for the wild. From the camp itself, guests
                can observe wildlife gathering at the watering hole — sometimes before you&apos;ve even finished
                your morning coffee.
              </p>
              <Button to="/experiences/wildlife-encounters" variant="outline" tone="light">
                Discover Wildlife
              </Button>
            </Reveal>
          </div>
        </section>

        {/* Sunset Sundowner feature */}
        <section className="home-sundowner">
          <Image
            photo={diningRockOverhang}
            alt="Table set beneath the rock overhang at Kivuko"
            sizes="100vw"
            loading="lazy"
          />
          <div className="home-sundowner__caption">
            <Reveal as="div">
              <Eyebrow>Every Evening</Eyebrow>
              <h2>The Sunset Sundowner</h2>
              <p>Bonfire and sundowner before dinner — part of every Full Board stay at Kivuko.</p>
            </Reveal>
          </div>
        </section>

        {/* Conservation strip */}
        <section className="section--sand section--tight">
          <div className="container home-conservation">
            <Reveal as="p" className="home-conservation__text">
              Kivuko sits inside the Taita Wildlife Conservancy — every stay supports the land and the
              communities around it.
            </Reveal>
            <Button to="/conservation" variant="outline" tone="dark">
              Responsible Tourism
            </Button>
          </div>
        </section>
      </PageLayout>
    </>
  );
}
