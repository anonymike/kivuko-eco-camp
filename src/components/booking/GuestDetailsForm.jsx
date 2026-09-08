import { useState } from "react";
import { bookingConfig } from "../../booking/bookingConfig.js";
import { formatDateShort } from "../../booking/bookingUtils.js";
import Button from "../ui/Button.jsx";
import "./GuestDetailsForm.css";

/**
 * Step 4 — guest details. Collects contact + special requests only; no
 * payment or sensitive data, per the integration-ready shell principle.
 * Submission goes through availabilityAdapter.submitBookingRequest
 * (currently the demo adapter: nothing is stored or sent).
 */
export default function GuestDetailsForm({ unit, nights, booking, onSubmit }) {
  const { checkIn, checkOut, adults, children } = booking;
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    onSubmit({
      checkIn,
      checkOut,
      nights,
      adults,
      children,
      unit: unit.name,
      guest: {
        name: fd.get("name") || "",
        email: fd.get("email") || "",
        phone: fd.get("phone") || "",
        country: fd.get("country") || "",
        requests: fd.get("requests") || "",
      },
    });
  }

  return (
    <section className="details">
      <div className="container details__grid">
        <form className="details__form" onSubmit={handleSubmit}>
          <p className="eyebrow eyebrow--dark">Step 4 · Guest Details</p>
          <h1>Who is joining us?</h1>
          <p className="details__lead">
            We&apos;ll confirm your reservation by email or WhatsApp. No payment is taken here.
          </p>

          <label>
            Full name
            <input type="text" name="name" autoComplete="name" required />
          </label>

          <label>
            Email
            <input type="email" name="email" autoComplete="email" required />
          </label>

          <label>
            Phone <span className="details__optional">(recommended)</span>
            <input type="tel" name="phone" autoComplete="tel" />
          </label>

          <label>
            Country
            <input type="text" name="country" autoComplete="country-name" />
          </label>

          <label>
            Special requests
            <textarea
              name="requests"
              rows={4}
              placeholder="Dietary needs, arrival time, celebrations, transfers…"
            />
          </label>

          <div className="details__actions">
            <Button type="submit" variant="filled" disabled={submitting}>
              {submitting ? "Sending…" : "Request This Booking"}
            </Button>
            <Button variant="outline" tone="dark" onClick={() => window.history.back()}>
              Back
            </Button>
          </div>
        </form>

        <aside className="details__aside">
          <div className="details__card">
            <h3>Your stay</h3>
            <dl>
              <div>
                <dt>Dates</dt>
                <dd>
                  {formatDateShort(checkIn)} → {formatDateShort(checkOut)} · {nights}{" "}
                  {nights === 1 ? "night" : "nights"}
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
            <p className="details__demo">{bookingConfig.demoNotice}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
