import Image from "../ui/Image.jsx";
import Button from "../ui/Button.jsx";
import { bookingConfig } from "../../booking/bookingConfig.js";
import { formatDateShort } from "../../booking/bookingUtils.js";
import "./BookingReview.css";

const REVIEW_SIZES = "(min-width: 900px) 30vw, 92vw";

/**
 * Step 3 — review the selection before guest details: dates, guests,
 * accommodation, full price breakdown, inclusions, and the published
 * payment terms. No payment collection here — that belongs to the future
 * booking/payment provider.
 */
export default function BookingReview({ unit, nights, booking }) {
  const { checkIn, checkOut, adults, children, goTo } = booking;
  const nightly = bookingConfig.demoFromRates[unit.slug];
  const subtotal = nightly * nights;

  return (
    <section className="review">
      <div className="container review__grid">
        <div className="review__main">
          <p className="eyebrow eyebrow--dark">Step 3 · Review Your Stay</p>
          <h1>Almost there</h1>
          <p className="review__lead">
            Take a moment to check every detail before we continue.
          </p>

          <dl className="review__summary">
            <div>
              <dt>Check-in</dt>
              <dd>{formatDateShort(checkIn)}</dd>
            </div>
            <div>
              <dt>Check-out</dt>
              <dd>{formatDateShort(checkOut)}</dd>
            </div>
            <div>
              <dt>Nights</dt>
              <dd>{nights}</dd>
            </div>
            <div>
              <dt>Guests</dt>
              <dd>
                {adults} {adults === 1 ? "adult" : "adults"}
                {children > 0 ? ` · ${children} ${children === 1 ? "child" : "children"}` : ""}
              </dd>
            </div>
          </dl>

          <div className="review__unit">
            <Image photo={unit.image} alt={unit.name} sizes={REVIEW_SIZES} loading="lazy" />
            <div>
              <p className="review__capacity">{unit.capacity}</p>
              <h2>{unit.name}</h2>
              <p>{unit.description}</p>
            </div>
          </div>

          <div className="review__policies">
            <h3>Good to know</h3>
            <p>{bookingConfig.policies.payment}</p>
            {children > 0 && (
              <ul>
                {bookingConfig.policies.childrenPricing.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="review__actions">
            <Button variant="filled" onClick={() => goTo("/book/details")}>
              Continue to Guest Details
            </Button>
            <Button variant="outline" tone="dark" onClick={() => goTo("/book/results")}>
              Change Stay
            </Button>
            <button type="button" className="review__link" onClick={() => goTo("/book")}>
              ← Change dates or guests
            </button>
          </div>
        </div>

        <aside className="review__aside">
          <div className="review__card">
            <h3>Price breakdown</h3>
            <p className="review__rate">
              {bookingConfig.currencySymbol}
              {nightly} × {nights} {nights === 1 ? "night" : "nights"}
            </p>
            <dl className="review__breakdown">
              <div>
                <dt>Accommodation</dt>
                <dd>
                  {bookingConfig.currencySymbol}
                  {subtotal}
                </dd>
              </div>
              <div>
                <dt>{bookingConfig.taxNote}</dt>
                <dd>On request</dd>
              </div>
            </dl>
            <p className="review__total">
              Estimated total{" "}
              <strong>
                {bookingConfig.currencySymbol}
                {subtotal}
              </strong>
            </p>
            <p className="review__demo">{bookingConfig.demoNotice}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}