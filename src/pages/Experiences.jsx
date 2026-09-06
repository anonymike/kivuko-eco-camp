import PageLayout from "../components/layout/PageLayout.jsx";
import PageHero from "../components/ui/PageHero.jsx";
import SectionIntro from "../components/ui/SectionIntro.jsx";
import CardGrid from "../components/ui/CardGrid.jsx";
import Card from "../components/ui/Card.jsx";
import Reveal from "../components/ui/Reveal.jsx";
import { experiences } from "../data/experiences.js";
import { bushWalk } from "../data/imageAssets.js";

export default function Experiences() {
  return (
    <PageLayout>
      <PageHero
        image={bushWalk}
        imageAlt="Guests on a guided bush walk at Kivuko"
        eyebrow="Experiences"
        title="Your Wilderness. Your Way."
        badge="Curated by the camp"
        subhead="Choose Your Adventure"
        intro="From gentle birding to a challenging hill climb — each experience is shaped by the land and the moment."
      />

      <section>
        <div className="container">
          <Reveal>
            <CardGrid>
              {experiences.map((exp) => (
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
        </div>
      </section>

      <section className="section--sand section--tight">
        <div className="container">
          <SectionIntro eyebrow="On the Rock" title="The View Pillar">
            A climbable viewpoint above camp, offering a 360° panorama across the conservancy — one of the
            quieter ways to spend a morning at Kivuko.
          </SectionIntro>
        </div>
      </section>
    </PageLayout>
  );
}
