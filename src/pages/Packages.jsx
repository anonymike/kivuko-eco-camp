import PageLayout from "../components/layout/PageLayout.jsx";
import PageHero from "../components/ui/PageHero.jsx";
import CardGrid from "../components/ui/CardGrid.jsx";
import Card from "../components/ui/Card.jsx";
import Reveal from "../components/ui/Reveal.jsx";
import { packages } from "../data/packages.js";
import { diningRockOverhang } from "../data/imageAssets.js";

export default function Packages() {
  return (
    <PageLayout>
      <PageHero
        image={diningRockOverhang}
        imageAlt="A table set for a Kivuko package stay"
        eyebrow="Packages"
        title="Bundled for the Wild"
        badge={`${packages.length} Packages`}
        subhead="Accommodation, Dining & Experiences"
        intro="Brought together — simply arrive and let the wild unfold."
      />

      <section>
        <div className="container">
          <Reveal>
            <CardGrid>
              {packages.map((pkg) => (
                <Card
                  key={pkg.slug}
                  to={`/contact?subject=package&package=${pkg.slug}`}
                  image={pkg.image}
                  imageAlt={pkg.name}
                  badge={pkg.duration}
                  title={pkg.name}
                  description={pkg.oneLiner}
                  linkLabel="View"
                />
              ))}
            </CardGrid>
          </Reveal>
        </div>
      </section>
    </PageLayout>
  );
}
