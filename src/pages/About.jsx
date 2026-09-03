import PageLayout from "../components/layout/PageLayout.jsx";
import PageHero from "../components/ui/PageHero.jsx";
import InfoCard from "../components/ui/InfoCard.jsx";
import heroImage from "../assets/images/dining-pavilion-exterior.jpg";
import { contact } from "../data/siteConfig.js";

export default function About() {
  return (
    <PageLayout>
      <PageHero
        image={heroImage}
        imageAlt="Kivuko's rock-sheltered pavilion"
        eyebrow="About"
        title="The Kivuko Story"
        badge="Open All Year"
        subhead="Genuine Kenyan Hospitality"
        intro="Leave the busy world behind. From the moment you arrive, Kivuko welcomes you into a world of dramatic landscapes, rich culture, wildlife, and genuine Kenyan hospitality."
      />

      <section>
        <div className="container info-card-grid">
          <InfoCard title="Secure Eco Gate">
            A gated, secure entrance into the conservancy sets the tone the moment you arrive at Kivuko.
          </InfoCard>
          <InfoCard title="A Warm Welcome">
            Reception is open {contact.receptionHours} — the camp team is on hand throughout your stay.
          </InfoCard>
        </div>
      </section>
    </PageLayout>
  );
}
