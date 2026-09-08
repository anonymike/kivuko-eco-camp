import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useBooking from "../hooks/useBooking.js";
import { availabilityAdapter } from "../booking/availabilityAdapter.js";
import { bookingConfig } from "../booking/bookingConfig.js";
import { sendBookingNotification } from "../services/emailService.js";
import { stayUnits } from "../data/stay.js";
import BookingSteps from "../components/booking/BookingSteps.jsx";
import BookingSearchPanel from "../components/booking/BookingSearchPanel.jsx";
import AvailabilityResults from "../components/booking/AvailabilityResults.jsx";
import BookingReview from "../components/booking/BookingReview.jsx";
import GuestDetailsForm from "../components/booking/GuestDetailsForm.jsx";
import BookingConfirmation from "../components/booking/BookingConfirmation.jsx";
import { formatDateShort } from "../booking/bookingUtils.js";
import "./Booking.css";

/**
 * The booking environment — a functional, conversion-focused space inside
 * the Kivuko site (the marketing pages stay cinematic). All step state
 * travels in URL params via useBooking, and every availability/pricing
 * value comes from availabilityAdapter, so the UI is ready for a real
 * booking engine without restructuring.
 *
 * Steps: /book (search) → /book/results → /book/review → /book/details
 * → /book/confirmed
 */
export default function Booking() {
  const { pathname } = useLocation();
  const booking = useBooking();
  const { checkIn, checkOut, hasDates, unit: unitSlug, nights, adults, children, goTo } = booking;

  const step =
    pathname === "/book"
      ? "search"
      : pathname === "/book/results"
        ? "results"
        : pathname === "/book/review"
          ? "review"
          : pathname === "/book/details"
            ? "details"
            : pathname === "/book/confirmed"
              ? "confirmed"
              : "search";

  const unit = stayUnits.find((u) => u.slug === unitSlug) || null;

  // Step guards — the flow always has dates (and a unit from results on).
  if (step !== "search" && !hasDates) return <Navigate to="/book" replace />;
  if ((step === "review" || step === "details" || step === "confirmed") && !unit) {
    return <Navigate to="/book/results" replace />;
  }

  return (
    <div className="booking-page">
      {step === "search" && <BookingSearchPanel booking={booking} />}

      {step !== "search" && <BookingSteps current={step === "results" ? 2 : step === "review" ? 3 : 4} />}

      {step === "results" && <ResultsStep booking={booking} />}
      {step === "review" && unit && <BookingReview unit={unit} nights={nights} booking={booking} />}
      {step === "details" && unit && <DetailsStep unit={unit} nights={nights} booking={booking} />}
      {step === "confirmed" && unit && <BookingConfirmation unit={unit} nights={nights} booking={booking} />}

      {(step === "review" || step === "details") && unit && (
        <MobileSummary
          unit={unit}
          nights={nights}
          adults={adults}
          children={children}
          label={step === "review" ? "Continue" : "Next"}
          onAction={() => goTo(step === "review" ? "/book/details" : "/book/confirmed")}
        />
      )}
    </div>
  );
}

function ResultsStep({ booking }) {
  const { checkIn, checkOut, goTo } = booking;
  const [state, setState] = useState({ loading: true, results: [], demo: false });

  useEffect(() => {
    let cancelled = false;
    setState({ loading: true, results: [], demo: false });
    availabilityAdapter
      .checkAvailability({ checkIn, checkOut })
      .then(({ results, demo }) => {
        if (!cancelled) setState({ loading: false, results, demo });
      });
    return () => {
      cancelled = true;
    };
  }, [checkIn, checkOut]);

  if (state.loading) {
    return (
      <section className="results">
        <div className="container">
          <p className="eyebrow eyebrow--dark">Step 2 · Choose Your Stay</p>
          <h1 className="results__loading-h1">Checking availability…</h1>
          <p className="results__loading-note" role="status">
            Checking {formatDateShort(checkIn)} → {formatDateShort(checkOut)}
          </p>
        </div>
      </section>
    );
  }

  return <AvailabilityResults results={state.results} demo={state.demo} nights={booking.nights} booking={booking} />;
}

function DetailsStep({ unit, nights, booking }) {
  const { goTo } = booking;
  function handleSubmit(bookingData) {
    // Fire-and-forget: attempt to send owner notification email.
    // The API runs in demo mode when RESEND_API_KEY is not set.
    sendBookingNotification(bookingData);
    // Then complete the flow via the adapter.
    availabilityAdapter
      .submitBookingRequest(bookingData)
      .then(() => goTo("/book/confirmed"));
  }
  return <GuestDetailsForm unit={unit} nights={nights} booking={booking} onSubmit={handleSubmit} />;
}

/** Mobile-only sticky summary bar with the step's primary action. */
function MobileSummary({ unit, nights, adults, children, label, onAction }) {
  return (
    <div className="mobile-summary">
      <div className="mobile-summary__text">
        <strong>{unit.name}</strong>
        <span>
          {nights} {nights === 1 ? "night" : "nights"} · {adults} {adults === 1 ? "adult" : "adults"}
          {children > 0 ? ` · ${children} ${children === 1 ? "child" : "children"}` : ""}
        </span>
      </div>
      <button type="button" className="mobile-summary__cta" onClick={onAction}>
        {label}
      </button>
    </div>
  );
}
