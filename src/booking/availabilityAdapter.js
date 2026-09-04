/**
 * Booking data/API seam — the ONLY module the booking UI talks to for
 * availability and reservation submission.
 *
 *   checkAvailability({ checkIn, checkOut, adults, children })
 *     -> { demo: true, results: [ { unit, nightlyFrom, total, available } ] }
 *
 *   submitBookingRequest({ checkIn, checkOut, adults, children, unit, guest })
 *     -> { demo: true, reference: null, status: "request-received" }
 *
 * Today both are implemented by the clearly-labelled demoAdapter below.
 * When the owner selects a real booking engine / PMS / channel manager,
 * replace the implementation of these two functions (or swap the default
 * export) with an adapter that calls that provider — the UI does not need
 * to change, because it only consumes this module's return shapes.
 *
 * Deliberately async + shaped like a remote call, so the swap is a
 * one-file change rather than a refactor.
 */
import { stayUnits } from "../data/stay.js";
import { bookingConfig } from "./bookingConfig.js";
import { nightsBetween } from "./bookingUtils.js";

/**
 * Demo implementation. Returns every unit with its brochure from-rate as
 * a "from" estimate for the requested nights. `demo: true` lets the UI
 * show an honest "demo preview" treatment instead of pretending this is
 * live availability.
 */
async function demoCheckAvailability({ checkIn, checkOut }) {
  const nights = nightsBetween(checkIn, checkOut);
  const results = stayUnits.map((unit) => {
    const nightlyFrom = bookingConfig.demoFromRates[unit.slug] ?? null;
    return {
      unit,
      nightlyFrom,
      total: nightlyFrom === null ? null : nightlyFrom * nights,
      nights,
      available: true,
    };
  });
  return { demo: true, results };
}

/** Demo implementation — no reservation is created; nothing is stored. */
async function demoSubmitBookingRequest() {
  return { demo: true, status: "request-received", reference: null };
}

export const availabilityAdapter = {
  demo: true,
  checkAvailability: demoCheckAvailability,
  submitBookingRequest: demoSubmitBookingRequest,
};

export default availabilityAdapter;