import CinematicHero from "../components/sections/CinematicHero.jsx";
import WildReveal from "../components/sections/WildReveal.jsx";
import SectionIntro from "../components/ui/SectionIntro.jsx";
import Eyebrow from "../components/ui/Eyebrow.jsx";
import Button from "../components/ui/Button.jsx";
import CardGrid from "../components/ui/CardGrid.jsx";
import Card from "../components/ui/Card.jsx";
import Reveal from "../components/ui/Reveal.jsx";
import Image from "../components/ui/Image.jsx";
import PageLayout from "../components/layout/PageLayout.jsx";
import useParallax from "../hooks/useParallax.js";
import { stayUnits } from "../data/stay.js";
import { experiences } from "../data/experiences.js";
import { diningRockOverhang, elephant, birdingPhoto, campTentPhoto } from "../data/imageAssets.js";
import "./Home.css";

const occasions = [
  "A romantic escape",
  "A family adventure",
  "A wildlife experience",
  "A cultural journey",
];

export default function Home() {
  // The sundowner photograph drifts a few dozen pixels against the scroll —
  // the page's quiet editorial parallax. Flat on mobile / reduced motion.
  const sundownerRef = useParallax({ strength: 0.05, max: 22 });

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
            <Reveal as="div" variant="scale" className="home-occasions__text">
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
            <Reveal>
              <CardGrid>
                {stayUnits.map((unit) => (
                  <Card
                    key={unit.slug}
                    to={`/stay/${unit.slug}`}
                    image={unit.image}
                    imageAlt={unit.name}
                    title={unit.name}
                    description={unit.description}
                    meta={unit.capacity}
                  />
                ))}
              </CardGrid>
            </Reveal>
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
            <Reveal variant="scale">
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
            </Reveal>
            <div className="home-section-cta">
              <Button to="/experiences" variant="outline" tone="dark">
                All Experiences
              </Button>
            </div>
          </div>
        </section>

        {/* Wildlife feature */}
        <section className="home-wildlife-feature">
          <div className="container">
            <div className="home-wildlife-feature__header">
              <SectionIntro eyebrow="Wild Encounters" title="The wild is not a backdrop here.">
                It moves through the story of every stay — from elephants on the drive to birds moving quietly through the dry bush. Join guided drives, slow down for birding, and let Tsavo set the pace.
              </SectionIntro>
            </div>
            <div className="home-wildlife-feature__grid">
              <Reveal as="article" variant="mask" className="home-wildlife-feature__card home-wildlife-feature__card--hero">
                <Image photo={elephant} alt="Elephant moving through Tsavo bush" sizes="(min-width: 900px) 42vw, 100vw" loading="lazy" />
                <div>
                  <Eyebrow>Game drives</Eyebrow>
                  <h3>Tsavo, up close.</h3>
                  <p>Follow the tracks, read the landscape, and meet the giants of the bush with an experienced guide.</p>
                </div>
              </Reveal>
              <Reveal as="article" variant="scale" className="home-wildlife-feature__card home-wildlife-feature__card--reverse">
                <Image photo={birdingPhoto} alt="Bird standing in the dry bush" sizes="(min-width: 900px) 42vw, 100vw" loading="lazy" />
                <div>
                  <Eyebrow>Birding</Eyebrow>
                  <h3>Quiet moments, rare sightings.</h3>
                  <p>Start early, move slowly, and discover the smaller stories written through Tsavo&apos;s dry bush.</p>
                </div>
              </Reveal>
              <Reveal as="article" variant="scale" className="home-wildlife-feature__card">
                <Image photo={campTentPhoto} alt="Kivuko camp tent beneath a blue shade canopy" sizes="(min-width: 900px) 42vw, 100vw" loading="lazy" />
                <div>
                  <Eyebrow>Stay close</Eyebrow>
                  <h3>Sleep where the wild passes by.</h3>
                  <p>Return from the day&apos;s adventures to a quiet, open-air camp made for listening to the night.</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Dining teaser */}
        <section className="home-dining-section">
          <div className="home-dining">
            <img
              src="/images/dining-breakfast-plate.jpg"
              alt="Breakfast plate prepared at Kivuko Eco Camp"
              loading="lazy"
            />
            <div className="home-dining__overlay" aria-hidden="true" />
            <Reveal as="div" className="home-dining__text">
              <Eyebrow tone="light">Dining</Eyebrow>
              <h2>Taste the Wild</h2>
              <p>Every meal is part of the escape — unhurried, honest, and shaped by the land around you.</p>
              <Button to="/dining" variant="outline" tone="light">
                Explore Dining
              </Button>
            </Reveal>
          </div>
        </section>

        {/* Signature moment — "The Wild Reveals Itself" */}
        <WildReveal />

        {/* Sunset Sundowner feature */}
        <section className="home-sundowner">
          <Image
            ref={sundownerRef}
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
