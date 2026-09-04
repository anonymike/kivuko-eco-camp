import Image from "../ui/Image.jsx";
import Button from "../ui/Button.jsx";
import { bookingConfig } from "../../booking/bookingConfig.js";
import { formatDateShort } from "../../booking/bookingUtils.js";
import "./AvailabilityResults.css";

const RESULT_SIZES = "(min-width: 1024px) 50vw, 92vw";

/**
 * Step 2 — availability results. Renders one premium result card per
 * stay unit for the requested range. All values come from the adapter
 * (`results`); the demo treatment is driven by the adapter's `demo`
 * flag, so this component renders real-engine data unchanged later.
 */
export default function AvailabilityResults({ results, demo, nights, booking }) {
  const { checkIn, checkOut, adults, children, goTo, selectUnit } = booking;

  function handleSelect(slug) {
    selectUnit(slug);
    goTo("/book/review");
  }

  return (
    <section className="results">
      <div className="container">
        <header className="results__head">
          <p className="eyebrow eyebrow--dark">Step 2 · Choose Your Stay</p>
          <h1>Your dates are open</h1>
          <p className="results__summary">
            {formatDateShort(checkIn)} → {formatDateShort(checkOut)} · {nights} {nights === 1 ? "night" : "nights"} ·{" "}
            {adults} {adults === 1 ? "adult" : "adults"}
            {children > 0 ? ` · ${children} ${children === 1 ? "child" : "children"}` : ""}
          </p>
          <button type="button" className="results__edit" onClick={() => goTo("/book")}>
            Edit dates & guests
          </button>
        </header>

        {demo && (
          <div className="results__demo" role="note">
            <strong>{bookingConfig.demoBadge}</strong> — {bookingConfig.demoNotice}
          </div>
        )}

        <ul className="results__list">
          {results.map(({ unit, nightlyFrom, total }) => (
            <li key={unit.slug} className="result-card">
              <div className="result-card__media">
                <Image photo={unit.image} alt={unit.name} sizes={RESULT_SIZES} loading="lazy" />
              </div>

              <div className="result-card__body">
                <p className="result-card__capacity">{unit.capacity}</p>
                <h2>{unit.name}</h2>
                <p className="result-card__desc">{unit.description}</p>

                <div className="result-card__inclusions">
                  <h3>Full board includes</h3>
                  <ul>
                    {bookingConfig.policies.fullBoardIncludes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="result-card__rate">
                {nightlyFrom === null ? (
                  <p className="result-card__placeholder">{bookingConfig.pricePlaceholder}</p>
                ) : (
                  <>
                    <p className="result-card__from">from</p>
                    <p className="result-card__price">
                      {bookingConfig.currencySymbol}
                      {nightlyFrom} <span>/ night</span>
                    </p>
                    <p className="result-card__total">
                      {nights} {nights === 1 ? "night" : "nights"} · est.{" "}
                      <strong>
                        {bookingConfig.currencySymbol}
                        {total}
                      </strong>
                    </p>
                    <p className="result-card__tax">{bookingConfig.taxNote}</p>
                  </>
                )}
                <Button variant="filled" onClick={() => handleSelect(unit.slug)}>
                  Select
                </Button>
                <p className="result-card__availability">Available on request</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}