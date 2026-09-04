import { useEffect, useRef, useState } from "react";
import DateRangeCalendar from "./DateRangeCalendar.jsx";
import GuestsControl from "./GuestsControl.jsx";
import { bookingConfig } from "../../booking/bookingConfig.js";
import { formatDateBar } from "../../booking/bookingUtils.js";
import "./BookingSearchPanel.css";

/**
 * The booking environment's entry point ("Book Your Escape" landing):
 * a calm, dark reservations band with check-in / check-out / guests
 * controls and the primary CHECK AVAILABILITY action.
 *
 * The calendar and guest pickers open as modal dialogs; the selection
 * lives in URL params via useBooking (passed in from the page).
 */
export default function BookingSearchPanel({ booking }) {
  const { checkIn, checkOut, adults, children, setDates, setGuests, goTo } = booking;
  const [open, setOpen] = useState(null); // "dates" | "guests" | null
  const [validation, setValidation] = useState("");
  const lastTrigger = useRef(null);

  // Clear the inline validation as soon as the user fixes the selection.
  useEffect(() => {
    setValidation("");
  }, [checkIn, checkOut]);

  function openModal(name, trigger) {
    lastTrigger.current = trigger;
    setValidation("");
    setOpen(name);
  }

  function closeModal() {
    setOpen(null);
    lastTrigger.current?.focus();
  }

  function handleCheckAvailability() {
    if (!checkIn) {
      setValidation("Please choose your check-in date.");
      openModal("dates", null);
      return;
    }
    if (!checkOut) {
      setValidation("Please choose your check-out date.");
      openModal("dates", null);
      return;
    }
    goTo("/book/results");
  }

  const unavailableDates = [...bookingConfig.demoUnavailableDates];

  return (
    <section className="booking-search">
      <div className="container">
        <p className="eyebrow eyebrow--light">Reservations</p>
        <h1>Book Your Escape</h1>
        <p className="booking-search__sub">When will you join us in the wild?</p>

        <div className="booking-search__panel">
          <div className="booking-search__controls">
            <div className="booking-search__field">
              <label id="checkin-label" htmlFor="checkin-btn">
                Check-in
              </label>
              <button
                id="checkin-btn"
                type="button"
                className="booking-search__date"
                aria-haspopup="dialog"
                aria-expanded={open === "dates"}
                onClick={(e) => openModal("dates", e.currentTarget)}
              >
                <span aria-hidden="true" className="booking-search__date-icon">▸</span>
                {checkIn ? formatDateBar(checkIn) : "Select date"}
              </button>
            </div>

            <div className="booking-search__field">
              <label id="checkout-label" htmlFor="checkout-btn">
                Check-out
              </label>
              <button
                id="checkout-btn"
                type="button"
                className="booking-search__date"
                aria-haspopup="dialog"
                aria-expanded={open === "dates"}
                onClick={(e) => openModal("dates", e.currentTarget)}
              >
                <span aria-hidden="true" className="booking-search__date-icon">▸</span>
                {checkOut ? formatDateBar(checkOut) : "Select date"}
              </button>
            </div>

            <div className="booking-search__field">
              <label id="guests-label" htmlFor="guests-btn">
                Guests
              </label>
              <button
                id="guests-btn"
                type="button"
                className="booking-search__guests"
                aria-haspopup="dialog"
                aria-expanded={open === "guests"}
                onClick={(e) => openModal("guests", e.currentTarget)}
              >
                <span aria-hidden="true" className="booking-search__date-icon">◉</span>
                {adults} {adults === 1 ? "adult" : "adults"}
                {children > 0 ? ` · ${children} ${children === 1 ? "child" : "children"}` : ""}
              </button>
            </div>
          </div>

          <button
            type="button"
            className="booking-search__cta"
            onClick={handleCheckAvailability}
          >
            Check Availability
          </button>
        </div>

        {validation && (
          <p className="booking-search__validation" role="status">
            {validation}
          </p>
        )}

        <p className="booking-search__demo">{bookingConfig.demoNotice}</p>

        <ul className="booking-search__direct">
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

      {open === "dates" && (
        <DateRangeCalendar
          checkIn={checkIn}
          checkOut={checkOut}
          unavailableDates={unavailableDates}
          onSelect={setDates}
          onClose={closeModal}
        />
      )}
      {open === "guests" && (
        <GuestsControl adults={adults} children={children} onChange={setGuests} onClose={closeModal} />
      )}
    </section>
  );
}