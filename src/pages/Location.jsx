import PageLayout from "../components/layout/PageLayout.jsx";
import PageHero from "../components/ui/PageHero.jsx";
import Eyebrow from "../components/ui/Eyebrow.jsx";
import InfoCard from "../components/ui/InfoCard.jsx";
import Button from "../components/ui/Button.jsx";
import Reveal from "../components/ui/Reveal.jsx";
import heroImage from "../assets/images/camp-tents-exterior-rock.jpg";
import { contact } from "../data/siteConfig.js";
import "./Location.css";

const gettingHere = [
  { place: "Nairobi", detail: "~6 hours by road, or fly to Voi / Taita airstrip" },
  { place: "Mombasa", detail: "~3 hours by road" },
  { place: "Voi", detail: "~1 hour by road" },
];

export default function Location() {
  return (
    <PageLayout>
      <PageHero
        image={heroImage}
        imageAlt="The road into Kivuko's conservancy landscape"
        eyebrow="Location"
        title="Beyond Kivuko"
        badge="Where the wild is"
        subhead="Finding Kivuko"
        intro="Opposite Buchuma, Tsavo East National Park — inside the Taita Wildlife Conservancy, Kenya."
      />

      <section>
        <div className="container location-grid">
          <Reveal as="div" className="info-card-grid location-grid__cards">
            <InfoCard title="Taita Wildlife Conservancy">
              Kivuko sits within this private conservancy bordering Tsavo East.
            </InfoCard>
            <InfoCard title="Mt. Kasigau & Beyond">
              Kasigau, Rukinga and the Marungu Hills surround the camp — and Mt. Kilimanjaro appears on clear
              days.
            </InfoCard>
            <InfoCard title="Voi">
              The nearest gateway town — roughly an hour&apos;s drive from camp.
            </InfoCard>
            <InfoCard title="Tsavo East">
              Kenya&apos;s largest national park, accessible for extended game drives.
            </InfoCard>
          </Reveal>

          <div className="location-grid__map">
            {/* Placeholder for an embedded map — wire up a real embed URL
                when available. Kept as a clearly labelled placeholder per
                the "no fabricated integrations" brief. */}
            <div className="map-placeholder" role="img" aria-label="Map of Kivuko Eco Camp location">
              <p>Map embed placeholder</p>
              <span>Taita Wildlife Conservancy, Kenya</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section--sand">
        <div className="container">
          <Eyebrow>Getting Here</Eyebrow>
          <ul className="getting-here-list">
            {gettingHere.map((item) => (
              <li key={item.place}>
                <strong>{item.place}</strong>
                <span>{item.detail}</span>
              </li>
            ))}
          </ul>
          <div className="location-cta">
            <p>Need help arranging a transfer?</p>
            <Button
              href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
                "Hi Kivuko, I'd like help arranging a transfer to camp."
              )}`}
              variant="outline"
              tone="dark"
              target="_blank"
              rel="noreferrer"
            >
              Ask on WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
