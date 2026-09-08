import { bookingConfig } from "../../booking/bookingConfig.js";
import { formatDateLong } from "../../booking/bookingUtils.js";
import Button from "../ui/Button.jsx";
import "./BookingConfirmation.css";

/**
 * Step 5 — confirmation. Honest by design: with no booking engine
 * connected this shows a "request received" demo state, NOT a fake
 * confirmation. When the real adapter returns a booking reference, it
 * renders here (`reference` prop) without any other change.
 */
export default function BookingConfirmation({ unit, nights, booking, reference }) {
  const { checkIn, checkOut, adults, children, goTo } = booking;

  return (
    <section className="confirmation">
      <div className="container confirmation__inner">
        <div className="confirmation__mark" aria-hidden="true">
          ✓
        </div>
        <p className="eyebrow eyebrow--dark">Reservations</p>
        <h1>Your booking request is in</h1>
        <p className="confirmation__lead">
          {reference
            ? `Booking reference ${reference}.`
            : "This is the demo booking shell — no reservation has been created or sent yet. Use the contact channels below to book for real."}
        </p>

        <dl className="confirmation__summary">
          <div>
            <dt>Dates</dt>
            <dd>
              {formatDateLong(checkIn)} — {formatDateLong(checkOut)}
              <span>
                {nights} {nights === 1 ? "night" : "nights"}
              </span>
            </dd>
          </div>
          <div>
            <dt>Guests</dt>
            <dd>
              {adults} {adults === 1 ? "adult" : "adults"}
              {children > 0 ? ` · ${children} ${children === 1 ? "child" : "children"}` : ""}
            </dd>
          </div>
          <div>
            <dt>Accommodation</dt>
            <dd>{unit.name}</dd>
          </div>
        </dl>

        <div className="confirmation__next">
          <h2>Confirm directly with the camp</h2>
          <p>Reach the reservations team — they will confirm availability and arrangements personally.</p>
          <ul>
            <li>
              <a href={`tel:${bookingConfig.directContact.phone.replace(/\s+/g, "")}`}>
                {bookingConfig.directContact.phone}
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${bookingConfig.directContact.whatsappNumber}?text=${encodeURIComponent(
                  bookingConfig.directContact.whatsappMessage
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${bookingConfig.directContact.reservationsEmail}`}>
                {bookingConfig.directContact.reservationsEmail}
              </a>
            </li>
          </ul>
        </div>

        <div className="confirmation__actions">
          <Button variant="filled" onClick={() => goTo("/book")}>
            Start a New Booking
          </Button>
          <Button variant="outline" tone="dark" onClick={() => goTo("/stay")}>
            Explore the Stays
          </Button>
        </div>
      </div>
    </section>
  );
}
