/**
 * Vercel serverless function — handles booking email delivery.
 *
 * POST /api/send-booking-email
 * Body: { eventType: "booking-notification" | "booking-confirmation", booking: {...} }
 *
 * Environment variables required in the Vercel dashboard:
 *   RESEND_API_KEY          — Resend API key (secret)
 *   BOOKING_NOTIFY_EMAIL    — recipient for owner notifications
 *   BOOKING_FROM_EMAIL      — verified sender address
 *
 * This function never exposes the API key to the client. It reads
 * process.env server-side only.
 *
 * When RESEND_API_KEY is not set, the function logs a warning and
 * returns success (demo mode) — the booking flow continues without
 * blocking the guest.
 */

import { Resend } from "resend";
import {
  bookingNotificationTemplate,
  bookingConfirmationTemplate,
} from "../src/booking/emailTemplates.js";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const NOTIFY_EMAIL = process.env.BOOKING_NOTIFY_EMAIL;
const FROM_EMAIL = process.env.BOOKING_FROM_EMAIL || "bookings@kivuko-eco-camp.com";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { eventType, booking } = req.body || {};

  if (!eventType || !booking) {
    return res.status(400).json({ error: "Missing eventType or booking" });
  }

  // Demo mode — no Resend key configured. Log and succeed.
  if (!RESEND_API_KEY) {
    console.warn(
      `[email] RESEND_API_KEY not set — ${eventType} logged (demo mode):`,
      JSON.stringify(booking, null, 2)
    );
    return res.status(200).json({ ok: true, demo: true });
  }

  const resend = new Resend(RESEND_API_KEY);

  try {
    if (eventType === "booking-notification") {
      const html = bookingNotificationTemplate(booking);
      await resend.emails.send({
        from: FROM_EMAIL,
        to: NOTIFY_EMAIL || "reservations@kivuko-eco-camp.com",
        subject: `New Booking Request — ${booking.unit || "Kivuko"}`,
        html,
      });
    } else if (eventType === "booking-confirmation") {
      const html = bookingConfirmationTemplate(booking);
      await resend.emails.send({
        from: FROM_EMAIL,
        to: booking.guest?.email,
        subject: `Booking Confirmed — ${CAMP_NAME}`,
        html,
      });
    } else {
      return res.status(400).json({ error: `Unknown eventType: ${eventType}` });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(`[email] Failed to send ${eventType}:`, err);
    return res.status(500).json({ error: err.message || "Email delivery failed" });
  }
}

const CAMP_NAME = "Kivuko Eco Camp";
