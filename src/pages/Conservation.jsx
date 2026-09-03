import PageLayout from "../components/layout/PageLayout.jsx";
import PageHero from "../components/ui/PageHero.jsx";
import SectionIntro from "../components/ui/SectionIntro.jsx";
import InfoCard from "../components/ui/InfoCard.jsx";
import { agamaLizard } from "../data/imageAssets.js";

export default function Conservation() {
  return (
    <PageLayout>
      <PageHero
        image={agamaLizard}
        imageAlt="Wildlife at Kivuko, inside the Taita Wildlife Conservancy"
        eyebrow="Conservation"
        title="Responsible Tourism"
        badge="Taita Wildlife Conservancy"
        subhead="A Place Worth Protecting"
        intro="Kivuko sits inside a conservancy bordering Tsavo East — every stay is built around keeping it that way."
      />

      <section>
        <div className="container">
          <SectionIntro eyebrow="How We Operate" title="Conservation Pillars" align="left" />
          <div className="info-card-grid">
            <InfoCard title="Conservancy Partnership">
              Kivuko operates within the Taita Wildlife Conservancy, bordering Tsavo East National Park —
              wilderness that depends on the conservancy model to stay intact.
            </InfoCard>
            <InfoCard title="Community Initiatives">
              Guests can take part in local community activities, including a visit to the Lusario Widows
              Vegetable Farm and time with the Kasigau Women Basket Weavers.
            </InfoCard>
            <InfoCard title="Low-Impact Camp">
              Solar lighting and low-impact tented structures keep the camp's footprint light on the land it
              sits on.
            </InfoCard>
            <InfoCard title="Leave No Trace">
              The same ethos that shapes the camp's design carries into every guest experience Kivuko offers.
            </InfoCard>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
