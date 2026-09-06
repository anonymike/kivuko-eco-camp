import PageLayout from "../components/layout/PageLayout.jsx";
import PageHero from "../components/ui/PageHero.jsx";
import SectionIntro from "../components/ui/SectionIntro.jsx";
import CardGrid from "../components/ui/CardGrid.jsx";
import Card from "../components/ui/Card.jsx";
import Reveal from "../components/ui/Reveal.jsx";
import { stayUnits, amenities } from "../data/stay.js";
import { brand } from "../data/siteConfig.js";
import { tentsExterior } from "../data/imageAssets.js";

export default function Stay() {
  return (
    <PageLayout>
      <PageHero
        image={tentsExterior}
        imageAlt="Kivuko tents beneath the rock formation"
        eyebrow="Accommodation"
        title="Stay in the Wild"
        badge={`${brand.units} Units`}
        subhead="Private Spaces, Pure Wilderness"
        intro="Each unit is designed to disappear into the landscape while keeping you close to the wild."
      />

      <section>
        <div className="container">
          <Reveal>
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
          </Reveal>
        </div>
      </section>

      <section className="section--sand">
        <div className="container">
          <SectionIntro eyebrow="In Every Unit" title="What to Expect">
            The same standard of quiet comfort runs through every stay at Kivuko.
          </SectionIntro>
          <Reveal as="ul" className="amenity-list">
            {amenities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </Reveal>
        </div>
      </section>
    </PageLayout>
  );
}
