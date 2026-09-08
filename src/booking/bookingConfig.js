/**
 * Kivuko booking configuration — the single place the booking UI reads
 * camp-level rules from. Nothing here invents business rules: values that
 * are not yet confirmed by the owner stay conservative, configurable, and
 * clearly commented.
 *
 * When a real PMS / booking engine is connected, this file keeps the
 * *camp-level* static configuration (currency display, guest limits,
 * direct-contact fallback) while live rates/availability move into
 * availabilityAdapter.js.
 */
import { contact, brand } from "../data/siteConfig.js";
import { reservationTerms } from "../data/reservationTerms.js";

export const bookingConfig = {
  campName: brand.fullName,
  /**
   * Guest limits per booking. Conservative caps drawn from the largest
   * unit (the Banda sleeps up to 6) and the published children pricing.
   * Adjust when the owner confirms booking rules.
   */
  maxAdults: 6,
  maxChildren: 4,
  maxGuestsPerBooking: 8,

  /**
   * Sample dates marked unavailable so the calendar can demonstrate the
   * unavailable-date treatment. These are placeholders to exercise the UI,
   * NOT real inventory — real blocked dates come from the booking engine.
   */
  demoUnavailableDates: ["2026-12-24", "2026-12-25", "2026-12-26"],

  /**
   * Display copy shown wherever a value is demo-derived. Kept honest:
   * the demo shell never presents itself as live availability.
   */
  demoNotice:
    "This is a demo booking preview — no live availability or reservation engine is connected yet. Availability and final arrangements are confirmed directly by the camp.",
  demoBadge: "Demo availability",

  directContact: {
    phone: contact.phone,
    whatsappNumber: contact.whatsappNumber,
    whatsappMessage: contact.whatsappMessage,
    reservationsEmail: contact.reservationsEmail,
  },

  policies: {
    fullBoardIncludes: reservationTerms.fullBoardIncludes,
    payment: reservationTerms.payment,
  },
};
