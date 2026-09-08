import { useState } from "react";
import PageLayout from "../components/layout/PageLayout.jsx";
import PageHero from "../components/ui/PageHero.jsx";
import Eyebrow from "../components/ui/Eyebrow.jsx";
import Button from "../components/ui/Button.jsx";
import Reveal from "../components/ui/Reveal.jsx";
import Image from "../components/ui/Image.jsx";
import { contact } from "../data/siteConfig.js";
import { reservationTerms, enquirySubjects } from "../data/reservationTerms.js";
import {
  diningAreaTables,
  tentsExterior,
  agamaLizard,
  diningPavilionExterior,
  twinTentInterior,
} from "../data/imageAssets.js";
import "./Contact.css";

const contactStrip = [
  { photo: tentsExterior, alt: "Kivuko landscape at golden hour" },
  { photo: agamaLizard, alt: "Wildlife at Kivuko" },
  { photo: diningPavilionExterior, alt: "Kivuko tent exterior" },
  { photo: twinTentInterior, alt: "Kivuko tent interior" },
];

// Four-across on desktop, two-across on mobile.
const STRIP_SIZES = "(min-width: 700px) 23vw, 47vw";

/**
 * No booking/enquiry backend yet — both forms are fully built UI with
 * client-side state and a clearly-labelled placeholder submit handler.
 * Wire `handleEnquirySubmit` / `handleCallbackSubmit` up to a real
 * email/CRM webhook when the backend is ready; nothing else needs to
 * change.
 */
export default function Contact() {
  const [enquirySent, setEnquirySent] = useState(false);
  const [callbackSent, setCallbackSent] = useState(false);

  function handleEnquirySubmit(e) {
    e.preventDefault();
    // TODO: connect to booking/enquiry backend (email or CRM webhook).
    setEnquirySent(true);
  }

  function handleCallbackSubmit(e) {
    e.preventDefault();
    // TODO: connect to booking/enquiry backend (email or CRM webhook).
    setCallbackSent(true);
  }

  return (
    <PageLayout>
      <PageHero
        image={diningAreaTables}
        imageAlt="Dining tables set at Kivuko"
        eyebrow="Contact · Book"
        title="Begin Your Escape"
        badge="Direct is best"
        subhead="Tell Us About Your Stay"
        intro="No middlemen, no booking fees. Tell us your dates and we&apos;ll confirm availability directly."
      />

      <section>
        <div className="container contact-grid">
          <Reveal as="form" className="contact-form" onSubmit={handleEnquirySubmit}>
            <h2>Send an Enquiry</h2>
            <label>
              Full Name
              <input type="text" name="name" required />
            </label>
            <label>
              Email
              <input type="email" name="email" required />
            </label>
            <label>
              Phone
              <input type="tel" name="phone" />
            </label>
            <label>
              Subject
              <select name="subject" defaultValue={enquirySubjects[0]}>
                {enquirySubjects.map((subject) => (
                  <option key={subject}>{subject}</option>
                ))}
              </select>
            </label>
            <label>
              Message
              <textarea name="message" rows={4} required />
            </label>
            <Button type="submit" variant="filled">
              Send Enquiry
            </Button>
            {enquirySent && (
              <p className="contact-form__status" role="status">
                Thanks — this is a UI placeholder for now, so nothing was actually sent yet. Please reach us
                directly by phone or WhatsApp below in the meantime.
              </p>
            )}
          </Reveal>

          <Reveal as="form" className="contact-form contact-form--secondary" onSubmit={handleCallbackSubmit}>
            <h2>Request a Callback</h2>
            <label>
              Name
              <input type="text" name="callback-name" required />
            </label>
            <label>
              Phone
              <input type="tel" name="callback-phone" required />
            </label>
            <label>
              Preferred Time
              <input type="text" name="callback-time" placeholder="e.g. weekday mornings" />
            </label>
            <label>
              Message
              <textarea name="callback-message" rows={3} />
            </label>
            <Button type="submit" variant="outline" tone="dark">
              Request Callback
            </Button>
            {callbackSent && (
              <p className="contact-form__status" role="status">
                Thanks — this is a UI placeholder for now, so nothing was actually sent yet.
              </p>
            )}
          </Reveal>
        </div>
      </section>

      <section className="section--sand">
        <div className="container contact-direct">
          <Eyebrow>Direct Contact</Eyebrow>
          <ul>
            <li>
              <a
                href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
                  contact.whatsappMessage
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`tel:${contact.phone.replace(/\s+/g, "")}`}>{contact.phone}</a>
            </li>
            <li>
              <a href={`mailto:${contact.reservationsEmail}`}>{contact.reservationsEmail}</a>
            </li>
          </ul>
        </div>
      </section>

      <section>
        <div className="container">
          <h2 className="contact-terms__heading">Reservation Terms</h2>
          <div className="contact-terms">
            <div>
              <h3>Full Board Includes</h3>
              <ul>
                {reservationTerms.fullBoardIncludes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Payment</h3>
              <p>{reservationTerms.payment}</p>
            </div>
            <div>
              <h3>Optional Activities</h3>
              <ul>
                {reservationTerms.optionalActivities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section--tight">
        <div className="container contact-strip">
          {contactStrip.map((item) => (
            <Image
              key={item.photo.src}
              photo={item.photo}
              alt={item.alt}
              sizes={STRIP_SIZES}
              loading="lazy"
            />
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
