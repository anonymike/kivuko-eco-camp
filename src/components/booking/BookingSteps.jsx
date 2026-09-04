import { Link } from "react-router-dom";
import "./BookingSteps.css";

const STEPS = [
  { n: 1, label: "Dates & Guests", to: "/book" },
  { n: 2, label: "Choose Stay", to: "/book/results" },
  { n: 3, label: "Review", to: "/book/review" },
  { n: 4, label: "Guest Details", to: "/book/details" },
];

/**
 * Quiet step indicator for the booking flow. Completed steps link back;
 * the current step is marked. Confirmation is intentionally absent —
 * it's the destination, not a navigable step.
 */
export default function BookingSteps({ current }) {
  return (
    <nav className="booking-steps" aria-label="Booking progress">
      <ol>
        {STEPS.map((step) => {
          const state = step.n === current ? "current" : step.n < current ? "done" : "todo";
          return (
            <li key={step.n} className={`booking-steps__item booking-steps__item--${state}`}>
              {state === "done" ? (
                <Link to={step.to}>
                  <span className="booking-steps__n" aria-hidden="true">
                    {step.n}
                  </span>
                  {step.label}
                </Link>
              ) : (
                <span aria-current={state === "current" ? "step" : undefined}>
                  <span className="booking-steps__n" aria-hidden="true">
                    {step.n}
                  </span>
                  {step.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}